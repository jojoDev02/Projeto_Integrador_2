import { Op, literal } from "sequelize";

class WebsocketService {
    
    constructor(
        amizadeModel, 
        mensagemModel, 
        loggerHelper, 
        memcachedService
    ) {
        this.clients = {};        
        this.logger = loggerHelper;
        this.mensagemModel = mensagemModel;
        this.amizadeModel = amizadeModel;
        this.memcachedService = memcachedService;
    }

    handleConnection = async (ws, request) => {
        const senderId = request.url.substring(1);
        
        if (!senderId) {
            return;
        }

        this.logger.info(`User ${senderId} connected.`);
        
        const friends = await this._fetchFriends(senderId);

        this.logger.info(Object.entries(friends));
        
        const receiveFrom = friends?.map(friend => {
            return friend.id;
        });

        this.logger.info("receivers: " + receiveFrom)
        this.logger.info(receiveFrom);

        this.clients[senderId] = { ws, receivers: receiveFrom };
        
        ws.on("message", this.handleMessage);
        ws.on("close", () => {
            delete this.clients[senderId];
            this.logger.info(`User ${senderId} disconnected.`);
        });
        ws.on("error", (err) => {
            ws.send(err);
            this.logger.error(err)
        });

        ws.send(JSON.stringify("Connection stablished."));
    }

    _fetchFriends = async (id) => {
        let friends = undefined//await this.memcachedService.get(`user_${id}_friends`);


        if (!friends) {
           friends = await this.amizadeModel.findAll({
                raw: true,
                attributes: [
                    [literal(`CASE WHEN solicitanteId = ${id} THEN receptorId ELSE solicitanteId END`), "id"]
                ],
                where: {
                    [Op.or]: [
                        {solicitanteId: id}, {receptorId: id}
                    ],
                    status: "confirmada"

                } 
            }) || [];

            await this.memcachedService.set(`user_${id}_friends`, friends);
        }

        return friends;
    }
    
    handleMessage = async (data) => {
        const parsedData = JSON.parse(data);

        this.logger.info(parsedData);

        const { action, content } = parsedData;

        switch (action) {
            case "JOIN":
                return this._handleJoin(content);
            case "SEND":
                return this._handleSend(content);                
            default:
                throw Error("Invalid action.");
        }
    }

    _handleJoin = async (content) => {
        let { senderId , receiverId } = content;
                
        const messages = await this._fetchMessages(senderId, receiverId);

        const data = { action: "JOIN", content: { senderId, messages } };

        this.clients[senderId].ws.send(JSON.stringify(data));
    }

    _handleSend = async (content) => {
        let { senderId, receiverId, message } = content;

        const data = JSON.stringify({ action: "SEND", content: { senderId, message } });

        const [ sender ] = this._sendMessageBackToSender(senderId, data);

        this.logger.info(`Message sent by ${senderId}`);

        await this.mensagemModel.create({
            conteudo: message,
            dataEnvio: new Date(),
            receptorId: receiverId,
            emissorId: senderId
        });

        if (!sender.receivers.includes(Number.parseInt(receiverId))) return;

        this.logger.info(`Receiver ${receiverId} is in sender ${senderId} friends list.`);

        try {
            this._sendMessageToReceiver(receiverId, data);
        } catch (err) {
            this.logger.error(err);
        }
    }

    _sendMessageBackToSender = (senderId, data) => {
        const sender = this.clients[senderId];
        if (!sender) throw Error("Sender not online.");
        sender.ws.send(data);

        this.logger.info(`Message sent by ${senderId}`);

        return [ sender, data ];
    }

    _sendMessageToReceiver = (receiverId, data) => {
        const receiver = this.clients[receiverId];
        if (!receiver) throw Error("Receiver not online.");
        receiver.ws.send(data);

        this.logger.info(`Message received by ${receiverId}`);
    }

    _fetchMessages = async (senderId, receiverId) => {
        const messages = await this.mensagemModel.findAll({
            order: ["dataEnvio"],
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [{emissorId: senderId}, {receptorId: receiverId}],
                    },
                    {
                        [Op.and]: [{emissorId: receiverId}, {receptorId: senderId}]
                    }
                ]
            }, 
        });

        this.logger.info(messages);

        return messages;
    }
}

export default WebsocketService;
