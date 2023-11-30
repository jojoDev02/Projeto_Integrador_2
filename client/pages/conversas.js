import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";
import WebsocketService from "../src/services/websocket.service";


export default function Conversas() {

    const { usuarioAuth } = useContext(AuthContext);
    const [websocket, setWebsocket] = useState(null);
    const [receiver, setReceiver] = useState(-1);
    const [text, setText] = useState("");
    const [conversation, setConversation] = useState([]);
    const [notificacoes, setNotificacoes] = useState({});
    const [amigos, setAmigos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        console.log(usuarioAuth);

        if (!router.isReady) return;

        console.log(usuarioAuth.id);

        if (usuarioAuth.id == undefined) return;

        const client = new WebsocketService(`ws://localhost:8080/${usuarioAuth.id}`);      

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

            if (senderId != usuarioAuth.id) {
                setNotificacoes(prev => { return { ...prev, [senderId]: message } });

                if (senderId != receiver) return;
            }

            setConversation(prev => [...prev, {senderId, message}]);

            console.log(conversation);
        });
    }, [conversation]);

    

    useEffect(() => {
        const fetchAmigos = async () => {

            if (usuarioAuth.id == undefined) return;
    
            const res = await httpPy.get(`/usuarios/${usuarioAuth.id}/amizades`);
            
            console.log(res);

            const { conteudo } = res.data;
    
           

            console.log(conteudo);

            setAmigos(conteudo);
           
        }

        fetchAmigos();
    }, []);

    const sendText = (event) => {
        event.preventDefault();
    
        if (websocket != null) {
            const data = { action: "SEND", content: { senderId: usuarioAuth.id, receiverId: receiver, message: text } };
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
        setNotificacoes(prev => { 
            delete prev[receiver]
            return prev; 
        });
        setReceiver(receiverId);

        const data = {
            action: "JOIN",
            content: { senderId: usuarioAuth.id, receiverId }
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
                        amigos?.map(({ id, amigoId }) => {
                            return (
                                <ul key={ id }>
                                    <li onClick={ joinChat } id={ amigoId } style={{ background: notificacoes[amigoId] && receiver != amigoId ? "purple" : "" }}>Amigo { amigoId }</li>
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

                                            if (el.senderId == usuarioAuth.id) background = "red"; 
                                            
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

