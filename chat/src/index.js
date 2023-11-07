import { WebSocketServer } from "ws";
import { Mensagem } from "./models/index.js";
import WebsocketService from "./services/websocket.service.js";
import logger from "./utils/logger.js";

const webSocketServer = new WebSocketServer({ port: 8080 });
const websocketService = new WebsocketService(Mensagem, logger);

logger.info("Before connecting to websocket server.");

webSocketServer.on("connection", websocketService.handleConnection);


// webSocketServer.on("connection", (ws, request) => {
    
//     const senderId = request.url.substring(1);
    
//     logger.info(`User ${senderId} connected.`);

//     clients[senderId] = {ws, receiverId: null, status: "OUT"};
    
//     ws.on("message", async (data) => {
//         const message = JSON.parse(data);

//         switch (message.action) {
//             case "JOIN":
//                 if (clients[senderId].status != "OUT") {
//                     ws.send(`User ${senderId} is already in a chat yet.`);
//                     break;
//                 }

//                 clients[senderId].receiverId = message.data.content;
//                 clients[senderId].status = "IN";

//                 let messages = [];

              
//                 messages = await Mensagem.findAll({
//                     where: {
//                         emissorId: senderId,
//                         receptorId: message.data.content
//                     }
//                 });

//                 ws.send(messages);
//                 break;
//             case "SEND":
//                 if (clients[senderId].status != "IN") {
//                     ws.send(`User ${senderId} must be in a chat to send messages.`);
//                     break;
//                 }

//                 const receiver = clients[senderId].receiverId;

//                 if (clients[receiver]?.receiverId != senderId) break;
                
//                 clients[receiver].ws.send(message.data.content);
                
//                 const keys = Object.keys(messageHistory);

//                 let key = `${senderId}@${receiver}`;

//                 for (const existingKey of keys) {
//                     if (existingKey.includes(senderId) && existingKey.includes(receiver)) {
//                         key = existingKey;
//                         break;
//                     }
//                 }

//                 messageHistory[key] = key in messageHistory ? 
//                     [
//                         ...messageHistory[key],
//                         {senderId, receiverId: receiver, content: message.data.content, timeSent: new Date()}
//                     ]
//                     :
//                     [
//                         {senderId, receiverId: receiver, content: message.data.content, timeSent: new Date()}
//                     ]
                
//                 logger.info(messageHistory);
                
//                 break;
//             case "LEAVE":
//                 if (clients[senderId].status != "IN") {
//                     ws.send(`User ${senderId} is not in a chat yet.`);
//                     break;
//                 }

//                 const receiverId = clients[senderId].receiverId;
                
//                 const key1 = `${senderId}@${receiverId}`;
//                 const key2 = `${receiverId}@${senderId}`;

//                 const conversation = messageHistory[key1] || messageHistory[key2];

//                 if (conversation === undefined) break;

//                 for (const message of conversation) {
//                     Mensagem.create({
//                         emissorId: Number.parseInt(message.senderId),
//                         receptorId: Number.parseInt(message.receiverId),
//                         conteudo: message.content,
//                         dataEnvio: message.timeSent
//                     });
//                 }

//                 clients[senderId].receiverId = null;
//                 clients[senderId].status = "OUT";

//                 break;
//             default:
            
//         }
//     });

//     ws.on("close", () => {
//         delete clients[senderId];

//         logger.info(`User ${senderId} disconnected.`);
//     });

//     ws.on("error", (err) => {
//         logger.error(err)
//     });

// });



