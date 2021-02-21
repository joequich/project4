import express, { Application } from 'express';
import userRoutes from '../routes/users';
import cors from 'cors';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPath = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error( error );
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Body
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' +this.port);
        });
    }

    routes() {
        this.app.use(this.apiPath.users, userRoutes);
    }
}

export default Server;