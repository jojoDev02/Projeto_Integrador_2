import { Op } from "sequelize";

class WebsocketService {
    
    constructor(amizadeModel, mensagemModel, logger) {
        this.clients = {};
        this.messagesHistory = {};
        
        this.logger = logger;
        this.mensagemModel = mensagemModel;
        this.amizadeModel = amizadeModel;
    }

    handleConnection = async (ws, request) => {
        const sender = request.url.substring(1);
    
        this.logger.info(`User ${sender} connected.`);
        
        const amizades = await this.amizadeModel.findAll({
            where: {
                [Op.or]: [
                    {solicitanteId: sender}, {receptorId: sender}
                ]
            }
        });

        let receivers = [];

        receivers = amizades?.map(amizade => {
            return amizade.solicitanteId == sender ? amizade.receptorId : amizade.solicitanteId;
        });

        console.log(receivers);

        this.clients[sender] = { ws, receivers };
        
        ws.on("message", this.handleMessage);
        
        ws.on("close", () => {
            delete this.clients[sender];

            this.logger.info(`User ${sender} disconnected.`);
        });

        ws.on("error", (err) => this.logger.error(err));

        ws.send(JSON.stringify("Connection stablished."));
    }
    
    handleMessage = async (data) => {
        const parsedData = JSON.parse(data);

        this.logger.info(parsedData);

        const { action, content } = parsedData;

        switch (action) {
            case "JOIN":
                const { senderId: senderIdJOIN, receiverId: receiverIdJOIN } = content;
                
                const mensagensJOIN = await this.mensagemModel.findAll({
                    order: ["dataEnvio"],
                    where: {
                        [Op.or]: [
                            {
                                [Op.and]: [{emissorId: senderIdJOIN}, {receptorId: receiverIdJOIN}],
                            },
                            {
                                [Op.and]: [{emissorId: receiverIdJOIN}, {receptorId: senderIdJOIN}]
                            }
                        ]
                    }, 
                });

                this.clients[senderIdJOIN].ws.send(JSON.stringify({action: "JOIN", content: {senderId: senderIdJOIN, messages: mensagensJOIN}}));

                break;
            case "SEND":
                const { senderId, receiverId, message } = content;
                const sender = this.clients[senderId];
                if (!sender) return;
                sender.ws.send(JSON.stringify({action: "SEND", content: { senderId, message }}));
        
                this.logger.info(`Message sent by ${senderId}`);
        
                await this.mensagemModel.create({
                    conteudo: message,
                    dataEnvio: new Date(),
                    receptorId: receiverId,
                    emissorId: senderId
                });
        
                if (!sender.receivers.includes(Number.parseInt(receiverId))) return;
        
                this.logger.info(`Receiver ${receiverId} is in sender ${senderId} frinds list.`);
        
                const receiver = this.clients[receiverId];
                if (!receiver) return;
                receiver.ws.send(JSON.stringify({action: "SEND", content: { senderId, message }}));
        
                this.logger.info(`Message received by ${receiverId}`);

                break;
        }


    }
}

export default WebsocketService;
