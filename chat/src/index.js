import express from "express";
import logger from "./utils/logger";
const app = express();

app.listen(8080, () => {
    logger.info(`Escutando na porta: 8080.`);
});