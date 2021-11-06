import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { users } from './users/users.controller'

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', users);

app.listen(PORT, () => console.info(`Server listening on port: ${ PORT }`));
