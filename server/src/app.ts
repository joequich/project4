import express, { Application } from 'express';
import * as http from 'http';
import cors from 'cors';
import morgan from 'morgan';

import env from './common/config/env.config';
import routes from './routes';

const app: Application = express();
const server: http.Server = http.createServer(app);

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.use(env.API.prefix, routes());

server.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});
