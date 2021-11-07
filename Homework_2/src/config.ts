import dotenv from 'dotenv';

dotenv.config();

export const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST_NAME: process.env.DB_HOST_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_USER_PASSWORD: process.env.DB_USER_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_CONNECTION_NAME: process.env.DB_CONNECTION_NAME,
};
