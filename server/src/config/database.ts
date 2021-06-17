import mongoose from 'mongoose';
import env from './enviroments';
let strUrlMongo = ''

if (env.DB_USER) {
    strUrlMongo = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`;
} else {
    strUrlMongo = `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
}

const DBConnection = async() => {
    try {
        const conn = await mongoose.connect(strUrlMongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useFindAndModify: false, 
            useCreateIndex: true
        });
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the database');
    }
};

export default DBConnection;