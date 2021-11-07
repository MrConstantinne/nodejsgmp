import express from 'express';
import cors from 'cors';
import {Connection, createConnection} from "typeorm";

import { config, getPostgresConfig } from "./connection";
import { users } from './users/users.controller'

const app = express();
const PORT = config.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', users);

createConnection();

app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`))
