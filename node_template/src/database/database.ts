import { Sequelize } from 'sequelize';
import { DB_HOST, DB_PASSWORD, DB_USER } from '../helpers/constants';

const db = new Sequelize('jac_back', DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
});

export default db;