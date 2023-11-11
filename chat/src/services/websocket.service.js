class WebsocketService {
    
    constructor(mensagemModel, logger) {
        this.ws = null;
        this.senderId = null;
        this.clients = {};
        this.messagesHistory = {};
        
        this.logger = logger;
        this.mensagemModel = mensagemModel;
    }

    handleConnection = (ws, request) => {
        const senderId = request.url.substring(1);

        this.senderId = senderId;
        this.ws = ws;
    
        this.logger.info(`User ${senderId} connected.`);
    
        this.clients[this.senderId] = {ws, receiverId: null, status: "OUT"};
        
        try {
            ws.on("message", this.handleMessage);
        } catch (err) {
            this.logger.error(err);
            ws.send(err.message);
        }
        
        ws.on("close", this.handleClose);
        ws.on("error", this.handleError);

        ws.send("Connection stablished.");
    }
    
    handleMessage = async (data) => {
        this.logger.info(data);

        const message = JSON.parse(data);

        this.logger.info(message);

        switch (message.action) {
            case "JOIN":
                return this._handleJOIN(message);
            case "SEND":
                return this._handleSEND(message);
            case "LEAVE":
                return this._handleLEAVE();
            default:
                throw new Error("The action provided is not valid.");
        }
    }

    _handleJOIN = async (message) => {
        if (this.clients[this.senderId].status != "OUT") {
            this.ws.send(`User ${this.senderId} is already in a chat.`);
            return;
        }

        const receiverId = message.content;

        this.clients[this.senderId].receiverId = receiverId;
        this.clients[this.senderId].status = "IN";

        const messages = await this.mensagemModel.findAll({
            where: {
                emissorId: this.senderId,
                receptorId: receiverId
            }
        }) || "Historico de mensagens";

        this.ws.send(messages);
    }

    _handleSEND = (message) => {
        this.logger.info("Handling message...");

        if (this.clients[this.senderId].status != "IN") {
            this.logger.info(`User ${this.senderId} must be in a chat to send messages.`);
            this.ws.send(`You must be in a chat to send messages.`);
            return;
        }

        const receiver = this.clients[this.senderId].receiverId;
        const data = {
            sender: this.senderId,
            message: message.content
        }

        this.clients[this.senderId].ws.send(JSON.stringify(data));

        if (this.clients[receiver]?.receiverId != this.senderId) return;
        
        this.clients[receiver].ws.send(JSON.stringify(data));
        
        const keys = Object.keys(this.messagesHistory);

        let key = `${this.senderId}@${receiver}`;

        for (const existingKey of keys) {
            if (existingKey.includes(this.senderId) && existingKey.includes(receiver)) {
                key = existingKey;
                break;
            }
        }

        this.messagesHistory[key] = key in this.messagesHistory ? 
            [
                ...this.messagesHistory[key],
                {senderId: this.senderId, receiverId: receiver, content: message.content, timeSent: new Date()}
            ]
            :
            [
                {senderId: this.senderId, receiverId: receiver, content: message.content, timeSent: new Date()}
            ]
        
    }

    _handleLEAVE = async () => {
        if (this.clients[this.senderId].status != "IN") {
            this.ws.send(`User ${this.senderId} is not in a chat yet.`);
            
            return;
        }

        const receiverId = this.clients[this.senderId].receiverId;
        
        const key1 = `${this.senderId}@${receiverId}`;
        const key2 = `${receiverId}@${this.senderId}`;

        const conversation = this.messagesHistory[key1] || this.messagesHistory[key2];

        this.clients[this.senderId].receiverId = null;
        this.clients[this.senderId].status = "OUT";

        if (conversation === undefined) return;
    }

    handleError = (err) => {
        this.logger.error(err)
    }

    handleClose = () => {
        delete this.clients[this.senderId];
    
        this.logger.info(`User ${this.senderId} disconnected.`);
    }
}

export default WebsocketService;