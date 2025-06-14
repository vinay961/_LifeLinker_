import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({origin: 'https://lifelinker-qzkv.onrender.com', credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import employeeRouter from './router/employee.router.js';
import userRouter from './router/user.router.js';

app.use('/api/employee', employeeRouter);
app.use('/api/user', userRouter);

export default app;