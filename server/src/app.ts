import express, { Application } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import env from './common/config/env.config';
import routes from './routes';

const app: Application = express();

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());

app.use(cookieParser());

app.use(env.API.prefix, routes());

export default app;
