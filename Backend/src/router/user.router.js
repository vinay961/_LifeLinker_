import {Router} from 'express';
import { createUser,LoginUser } from '../controller/user.controller.js';

const userRouter = Router();

userRouter.post('/createUser', createUser);
userRouter.post('/loginUser', LoginUser);

export default userRouter;