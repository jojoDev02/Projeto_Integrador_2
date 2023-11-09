class WebsocketService {
    constructor(url) {
        this.ws = new WebSocket(url);
    }

    send = (data) => {
        const jsonData = JSON.stringify(data);
        this.ws.send(jsonData);
    }
}

export default WebsocketService;