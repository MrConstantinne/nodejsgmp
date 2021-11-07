import express from 'express';
import { ConnectionOptions, createConnection } from "typeorm";

import { config } from "./config";
import { UsersEntity } from './users/users.entity';
import { UsersController} from './users/users.controller'

class Server {
    private app: express.Application;
    private usersController: UsersController;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set('port', config.SERVER_PORT || 3000);
    }

    public async routes() {
        await createConnection({
            name: config.DB_CONNECTION_NAME,
            type: config.DB_TYPE,
            host: config.DB_HOST_NAME,
            port: config.DB_PORT,
            username: config.DB_USER_NAME,
            password: config.DB_USER_PASSWORD,
            database: config.DB_NAME,
            entities: [ UsersEntity ],
            synchronize: true,
        } as ConnectionOptions);

        this.usersController = new UsersController();

        this.app.use('/user', this.usersController.router);
    }

    public start() {
        this.app.listen(this.app.get('port'), () => console.info(`Server listening on port: ${this.app.get('port')}`));
    }
}

const server = new Server();
server.start();
