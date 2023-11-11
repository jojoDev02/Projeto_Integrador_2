import pino from "pino";

class Logger {
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

export default Logger;