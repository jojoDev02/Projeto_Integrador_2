import { WebSocketServer } from "ws";
import Logger from "./helpers/logger.helper.js";
import { Mensagem } from "./models/index.js";
import WebsocketService from "./services/websocket.service.js";

const logger = new Logger();

const webSocketServer = new WebSocketServer({ port: 8080 });
const websocketService = new WebsocketService(Mensagem, logger);

logger.info("Before connecting to websocket server.");

webSocketServer.on("connection", websocketService.handleConnection);