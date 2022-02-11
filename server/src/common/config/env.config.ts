import path from 'path';
import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ 
    path: path.resolve(__dirname, `../../../.env.${process.env.NODE_ENV}`)
});

if (envFound.error) {
    throw new Error('Couldn\'t find .env file');
}

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT ? process.env.PORT : '', 10),
    DB: {
        HOST: process.env.MONGODB_HOST,
        PORT: process.env.MONGODB_PORT,
        USER: process.env.MONGODB_USER,
        PASS: process.env.MONGODB_PASS,
        NAME: process.env.MONGODB_DATABASE,
    },
    API: {
        prefix: '/api'
    },
    JWT: {
        ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
        ACCESS_EXPIRATION_TIME: process.env.JWT_ACCESS_EXPIRATION_TIME,
        REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
        REFRESH_EXPIRATION_TIME: process.env.JWT_REFRESH_EXPIRATION_TIME,
    },
    GOOGLE: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        SECRET_ID: process.env.GOOGLE_SECRET_ID,
    },
    CLOUDINARY: {
        URL: process.env.CLOUDINARY_URL,
        CLOUD_NAME: process.env.CLOUDINARY_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
    }
}


