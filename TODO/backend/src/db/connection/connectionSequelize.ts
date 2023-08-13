const { Sequelize } = require('sequelize');
import bcrypt from 'bcrypt';

const mysql = require('mysql2/promise');
import { config } from '../../config/config';

import setupModules from '../index';

const { dbName, dbHost, dbPort, dbUser, dbPassword } = config;

export const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: dbHost,
    user: dbUser,
    /*database: dbName,*/
    password: dbPassword,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);

  //encriptar
  const hashedPassword = await bcrypt.hash(config.defaultPassword, 10);

  //create first user
  await connection.query(
    ` INSERT INTO \`${dbName}\`.users (userName, password, createdAt, updatedAt) VALUES('${config.defaultUserName}', '${hashedPassword}', '2023-8-9', '2023-8-9');`
  );
  // await connection.query(` INSERT INTO \`${dbName}\`.users (userName, password, createdAt, updatedAt) VALUES('admin', '123456', '', '');`);
};

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mysql',
  }
);

//create table in database -
sequelize.sync();
setupModules(sequelize);

export default sequelize;
