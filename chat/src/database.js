import "dotenv/config";
import { Sequelize } from "sequelize";
import config from "../config/database.js";
import logger from "./utils/logger.js";

const mainInstance = new Sequelize(config.development);

(async () => {
    try {
        await mainInstance.authenticate();

        logger.info("Database connection established.");
    } catch (error) {
        logger.error("Failed establishing database connection.");
    }
})();

export {
    mainInstance
};
