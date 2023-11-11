import "dotenv/config";
import { Sequelize } from "sequelize";
import config from "../config/database.js";
import Logger from "./helpers/logger.helper.js";

const logger = new Logger();

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
