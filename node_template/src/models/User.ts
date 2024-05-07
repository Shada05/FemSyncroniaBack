import { DataTypes } from 'sequelize';
import db from '../database/database';

const User = db.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
});

export default User;