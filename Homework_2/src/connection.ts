import dotenv from 'dotenv';
import { ConnectionOptions} from 'typeorm';

dotenv.config();

export const config = {
    SERVER_PORT: process.env.SERVER_PORT,
};

export const getPostgresConfig = async (): Promise<ConnectionOptions> => {
    return {
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME,
        dropSchema: false,
        logging: true,
        synchronize: true,
        entities: [
          'dist/apps/backend/api/src/**/*.entity{.ts, .js}'
        ],
        cli: {
          'migrationsDir': 'db/migrations'
        }}
};
