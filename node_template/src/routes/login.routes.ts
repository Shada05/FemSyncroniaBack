import { Router } from 'express';
import { login } from '../controllers/user.controller';

const loginRouter = Router();

loginRouter.post('/login', login);

export default loginRouter;