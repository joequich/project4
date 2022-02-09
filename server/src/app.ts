import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import env from './common/config/env.config';
import routes from './routes';

const app: Application = express();

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.use(env.API.prefix, routes());

export default app;
