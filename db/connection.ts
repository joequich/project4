import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPass = process.env.DB_PASS || '';

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;