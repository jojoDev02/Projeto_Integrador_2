import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import WebsocketService from "../../src/services/websocket.service";
import { UserContext } from "../_app";

export default function Conversas() {

    const { authUser } = useContext(UserContext);
    const [websocket, setWebsocket] = useState(null);
    const [receiver, setReceiver] = useState(-1);
    const [text, setText] = useState("");
    const [conversation, setConversation] = useState([]);
    const [notifications, setNofification] = useState({});
    const [friends, setFriends] = useState([]);
    const router = useRouter();

    useEffect(() => {
        console.log(authUser);

        if (!router.isReady) return;

        console.log(authUser.id);

        const client = new WebsocketService(`ws://localhost:8080/${authUser.id}`);      

        setWebsocket(client);
        
    }, [router]);

    useEffect(() => {
        if (!websocket) return;

        websocket.onMessage((event) => {
            const data = JSON.parse(event.data);

            console.log(data);

            if (data.action == "JOIN") {

                const { messages } = data.content;

                messages.map(message => {
                    setConversation(prev =>  [ ...prev, { senderId: message.emissorId, message: message.conteudo } ] );
                })

                return;
            }

            const { message, senderId } = data.content;
            
            if (!message || !senderId) return;

            if (senderId != authUser.id) {
                setNofification(prev => { return { ...prev, [senderId]: message } });

                if (senderId != receiver) return;
            }

            setConversation(prev => [...prev, {senderId, message}]);

            console.log(conversation);
        });
    }, [conversation]);

    

    useEffect(() => {
        const fetchAmigos = async () => {

            if (authUser.id == -1) return;
    
            const res = await fetch(`http://localhost:5000/api/v1/usuarios/${authUser.id}/amizades`);
            
            const data = await res.json();
    
            const friendships = data.content;

            friendships.map(friendship => {
                const friendId = friendship.receptorId == authUser.id ? friendship.solicitanteId : friendship.receptorId;

                setFriends(prev => [ ...prev, { id: friendId }])
            });
        }

        fetchAmigos();
    }, [authUser.id]);

    const sendText = (event) => {
        event.preventDefault();
    
        if (websocket != null) {
            const data = { action: "SEND", content: { senderId: authUser.id, receiverId: receiver, message: text } };
            websocket.send(data);
        }
        
        setText("");
    }

    const handleMessage = (event) => {
        const value = event.target.value;

        setText(value);
    }

    const joinChat = (event) => {
        const receiverId = event.target.id;
        
        if (receiverId == receiver) return;
        
        setConversation([]);
        setNofification(prev => { 
            delete prev[receiver]
            return prev; 
        });
        setReceiver(receiverId);

        const data = {
            action: "JOIN",
            content: { senderId: authUser.id, receiverId }
        };

        websocket.send(data);
    }

    return (
        <>
            <h1>Conversas</h1>
            <div style={{ display: "flex" }}>
                <section>
                    <h2>Amigos</h2>
                    {
                        friends?.map(({ id }) => {
                            return (
                                <ul key={ id }>
                                    <li onClick={ joinChat } id={ id } style={{ background: notifications[id] && receiver != id ? "purple" : "" }}>Amigo { id }</li>
                                </ul>
                            )
                        })
                    }
                </section>
                <section>
                    { 
                        receiver == -1 ?
                            <div></div>
                            :
                            <>
                                <div>
                                    {
                                        conversation?.map(el => {
                                            let background = "green";

                                            if (el.senderId == authUser.id) background = "red"; 
                                            
                                            return <div style={{ background }}>{ el.message }</div>
                                        })
                                    }                           
                                </div>
                                <form onSubmit={ sendText }>
                                    <input type="text" value={ text } onChange={ handleMessage }/>
                                </form>
                            </>
                    }
                </section>
            </div>
        </>
    )
}

