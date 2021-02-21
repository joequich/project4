import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
    firstname: {
        type: DataTypes.STRING(45)
    },
    lastname: {
        type: DataTypes.STRING(45)
    },
    email: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING(25)
    },
    password: {
        type: DataTypes.STRING(25)
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

export default User;