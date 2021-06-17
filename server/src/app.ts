import express, { Application } from "express";
import cors from 'cors';
import morgan from 'morgan';

import { env, DBConnection } from './config/index';
import routes from './routes'

const app: Application = express();

DBConnection();

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.use(env.API.prefix, routes());

app.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});
