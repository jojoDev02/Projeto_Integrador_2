class WebsocketService {
    constructor(url) {
        this.ws = new WebSocket(url);
    }

    send = (data) => {
        const jsonData = JSON.stringify(data);
        this.ws.send(jsonData);
    }

    onMessage = (callback) => {
        this.ws.onmessage = callback;
    }
}

export default WebsocketService;