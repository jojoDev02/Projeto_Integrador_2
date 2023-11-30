import { WebSocketServer } from "ws";
import "./associations.js";
import LoggerHelper from "./helpers/logger.helper.js";
import { Amizade, Mensagem } from "./models/index.js";
import MemcachedService from "./services/memcached.service.js";
import WebsocketService from "./services/websocket.service.js";

const logger = new LoggerHelper();
const webSocketServer = new WebSocketServer({ port: 8080, host: "0.0.0.0" });
const memcachedService = new MemcachedService("cache:11211");

const websocketService = new WebsocketService(Amizade, Mensagem, logger, memcachedService);

webSocketServer.on("connection", websocketService.handleConnection);

