import { Router } from 'express';
import { syncDB } from '../controllers/config.controller';

const configRouter = Router();

configRouter.get('/sync-db', syncDB);

export default configRouter;