import express, { Application } from 'express';
import cors from "cors";
import * as dotenv from 'dotenv'
dotenv.config()

import db from './database/database';
import { PORT } from './helpers/constants';

import configRouter from './routes/config.routes';
import loginRouter from './routes/login.routes';
import productsRouter from './routes/products.routes';
import path from 'path';


class Server {

    public app: Application;
    private port: number;
    private apiPaths: { [key: string]: string }

    constructor() {
        this.app = express();
        this.port = PORT;
        this.apiPaths = {
            config: '/config/',
            login: '/auth/',
            products: '/products/'
        }

        // this.dbConnection();
        this.middlewares();
        this.routes();
    }

    private async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error: any) {
            console.error('Unable to connect to the database:', error);
        }
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb' }));
        this.app.use('/images', express.static(path.join(__dirname, 'images')));
    }

    private routes() {
        this.app.use(this.apiPaths.config, configRouter);
        this.app.use(this.apiPaths.login, loginRouter);
        this.app.use(this.apiPaths.products, productsRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }
}

export default Server;