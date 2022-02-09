import * as http from 'http';
import * as https from 'https';
import app from './app';
import env from './common/config/env.config';

const server = env.NODE_ENV === 'production' ? https.createServer(app) : http.createServer(app);

server.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});