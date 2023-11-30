import "dotenv/config";

export default {
    development: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: "mysql",
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USER 
    },
    test: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: "mysql",
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USER 
    },
    production: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: "mysql",
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USER 
    }
}
