import mongoose from 'mongoose';
import env from '../config/env.config';
let strUrlMongo = ''

if (env.DB.USER) {
    strUrlMongo = `mongodb+srv://${env.DB.USER}:${env.DB.PASS}@${env.DB.HOST}/${env.DB.NAME}?retryWrites=true&w=majority`;
} else {
    strUrlMongo = `mongodb://${env.DB.HOST}:${env.DB.PORT}/${env.DB.NAME}`;
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