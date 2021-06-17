import path from 'path';
import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ 
    path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
});

if (envFound.error) {
    throw new Error('Couldn\'t find .env file');
}

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT ? process.env.PORT : '', 10),
    DB_HOST: process.env.MONGODB_HOST,
    DB_PORT: process.env.MONGODB_PORT,
    DB_USER: process.env.MONGODB_USER,
    DB_PASS: process.env.MONGODB_PASS,
    DB_NAME: process.env.MONGODB_DATABASE,
    API: {
        prefix: '/api'
    }
}


