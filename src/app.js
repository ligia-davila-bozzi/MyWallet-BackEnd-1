import express from 'express';
import cors from 'cors';
import { postSignUp } from './controllers/sing-up.js';
import { postLogIn } from './controllers/log-in.js';
import { postWallet } from './controllers/postWallet.js';
import { getWallet } from './controllers/getWallet.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', postSignUp);
app.post('/log-in', postLogIn);
app.post('/wallet', postWallet);
app.get('/wallet', getWallet);

export default app;
