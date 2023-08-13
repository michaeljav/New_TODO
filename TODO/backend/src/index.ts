import dotenv from 'dotenv';
import Server from './server';

//configuration dotenv
dotenv.config();
// console.log(process.env.PORT);
const server = new Server();
