import mongoose from 'mongoose';
import env from '../config/env.config';
let strUrlMongo = ''

if (env.DB_USER) {
    strUrlMongo = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`;
} else {
    strUrlMongo = `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
}

const options = {
    autoIndex: false, // default is true is great for development, but not ideal for production
    poolSize: 10, // default is 5, maintain up to 10 connections
    bufferMaxEntries: 0, // if not connected, return errors inmediately rather than waiting for reconnect
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}

const connectDB = async() => {
    try {
        console.log('MongoDB is connecting...');
        const conn = await mongoose.connect(strUrlMongo, options);
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the database');
    }
};

connectDB();

export default mongoose;