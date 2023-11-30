import { WebSocketServer } from "ws";
import "./associations.js";
import Logger from "./helpers/logger.helper.js";
import { Amizade, Mensagem } from "./models/index.js";
import WebsocketService from "./services/websocket.service.js";

const logger = new Logger();

const webSocketServer = new WebSocketServer({ port: 8080, host: "0.0.0.0" });
const websocketService = new WebsocketService(Amizade, Mensagem, logger);

webSocketServer.on("connection", websocketService.handleConnection);

