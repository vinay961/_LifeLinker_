import {Router} from 'express';
import { createUser,LoginUser,LogoutUser } from '../controller/user.controller.js';
import { verifyJWT } from '../middleware/checkAuth.js';

const userRouter = Router();

userRouter.post('/createUser', createUser);
userRouter.post('/loginUser', LoginUser);
userRouter.post('/logoutUser', verifyJWT, LogoutUser);

export default userRouter;