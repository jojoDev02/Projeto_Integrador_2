import { useEffect, useState } from "react";
import WebsocketService from "../../src/services/websocket.service";

export default function Conversas() {

    const [websocket, setWebsocket] = useState(null);

    useEffect(() => {
        const authUserId = 1;

        const client = new WebsocketService(`ws://localhost:8080/${authUserId}`);
        setWebsocket(client);
        
    }, []);

    const joinChat = (event) => {
        const receiverId = event.target.id;

        console.log(receiverId);

        if (websocket != null) {
            const data = { action: "JOIN", content: receiverId };
            websocket.send(data);
        }
    }

    return (
        <>
            <h1>Conversas</h1>
            <section>
                <h2>Amigos</h2>
                <ul>
                    <li id={ 2 } onClick={ joinChat }>Amigo</li>
                </ul>
            </section>
            <section>
                <div>

                </div>
            </section>
        </>
    )
}

