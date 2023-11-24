import pino from "pino";

class LoggerHelper {
    constructor() {
        this.logger = pino();
    }

    info = (message) => {
        this.logger.info(message);
    }

    error = (message) => {
        this.logger.error(message);
    }
}

export default LoggerHelper;