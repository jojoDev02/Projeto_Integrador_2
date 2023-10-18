import "dotenv/config";
import { Sequelize } from "sequelize";
import logger from "./utils/logger";

const mainInstance = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER
});

(async () => {
    try {
        await mainInstance.authenticate();

        logger.info("Database connection established.");
    } catch (error) {
        logger.error("Failed establishing database connection.");
    }
});

export {
    mainInstance
};
