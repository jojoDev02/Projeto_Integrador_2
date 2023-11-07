class WebsocketService {
    
    constructor(mensagemModel, logger) {
        this.ws = null;
        this.sender = null;
        this.clients = {};
        this.messagesHistory = {};
        
        this.logger = logger;
        this.mensagemModel = mensagemModel;
    }

    handleConnection = (ws, request) => {
        const senderId = request.url.substring(1);

        this.sender = senderId;
    
        this.logger.info(`User ${senderId} connected.`);
    
        this.clients[senderId] = {ws, receiverId: null, status: "OUT"};
        
        ws.on("message", this.handleMessage);
        ws.on("close", this.handleClose);
        ws.on("error", this.handleError);
    }
    
    handleMessage = async (data) => {
        const message = JSON.parse(data);

        switch (message.action) {
            case "JOIN":
                return this._handleJOIN();
            case "SEND":
                if (this.clients[this.sender].status != "IN") {
                    ws.send(`User ${this.sender} must be in a chat to send messages.`);
                    break;
                }

                const receiver = this.clients[this.sender].receiverId;

                if (this.clients[receiver]?.receiverId != this.sender) break;
                
                this.clients[receiver].ws.send(message.data.content);
                
                const keys = Object.keys(this.messagesHistory);

                let key = `${this.sender}@${receiver}`;

                for (const existingKey of keys) {
                    if (existingKey.includes(this.sender) && existingKey.includes(receiver)) {
                        key = existingKey;
                        break;
                    }
                }

                this.messagesHistory[key] = key in this.messagesHistory ? 
                    [
                        ...this.messagesHistory[key],
                        {senderId: this.sender, receiverId: receiver, content: message.data.content, timeSent: new Date()}
                    ]
                    :
                    [
                        {senderId: this.sender, receiverId: receiver, content: message.data.content, timeSent: new Date()}
                    ]
                
                this.logger.info(this.messagesHistory);
                
                break;
            case "LEAVE":
                if (this.clients[this.sender].status != "IN") {
                    ws.send(`User ${this.sender} is not in a chat yet.`);
                    break;
                }

                const receiverId = this.clients[this.sender].receiverId;
                
                const key1 = `${this.sender}@${receiverId}`;
                const key2 = `${receiverId}@${this.sender}`;

                const conversation = this.messagesHistory[key1] || this.messagesHistory[key2];

                if (conversation === undefined) break;

                for (const message of conversation) {
                    await this.mensagemModel.create({
                        emissorId: Number.parseInt(message.this.sender),
                        receptorId: Number.parseInt(message.receiverId),
                        conteudo: message.content,
                        dataEnvio: message.timeSent
                    });
                }

                this.clients[this.sender].receiverId = null;
                this.clients[this.sender].status = "OUT";

                break;
            default:
            
        }
    }

    _handleJOIN = async () => {
        if (this.clients[this.sender].status != "OUT") {
            ws.send(`User ${this.sender} is already in a chat yet.`);
            return false;
        }

        this.clients[this.sender].receiverId = message.data.content;
        this.clients[this.sender].status = "IN";

        let messages = [];

      
        messages = await this.mensagemModel.findAll({
            where: {
                emissorId: this.sender,
                receptorId: message.data.content
            }
        });

        ws.send(messages);

        return true;
    }

    _handleSEND = () => {

    }

    _handleLEAVE = () => {

    }

    handleError = (err) => {
        this.logger.error(err)
    }

    handleClose = () => {
        delete clients[this.sender];
    
        this.logger.info(`User ${this.sender} disconnected.`);
    }
}

export default WebsocketService;