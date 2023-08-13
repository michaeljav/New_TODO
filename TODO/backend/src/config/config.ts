// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || '3001',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecretKey: process.env.SECRET_KEY || 'jHUn62xH"`mH)dnWD-',
  defaultUserName: process.env.DEFAULT_USER || 'admin',
  defaultPassword: process.env.DEFAULT_PASSWORD || '123456',
};

// console.log('SECRET MICHAEL ', config);
// module.exports = { config };
