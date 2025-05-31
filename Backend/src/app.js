import express from 'express';
import cros from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cros({origin: 'http://localhost:5173', Credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

export default app;