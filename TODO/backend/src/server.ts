import express, { Application } from 'express';
const dotenv = require('dotenv');
const cors = require('cors');

import sequelize, { createDatabase } from './db/connection/connectionSequelize';
import { routerApi } from './routes';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';

    this.app.use(cors());
    this.app.use(express.json());
    this.listen();
    routerApi(this.app);
    this.dbConnect();
  }

  listen() {
    this.app.get('/', (req, res) => {
      res.send('Backend Working...');
    });

    // routerApi(this.app);

    this.app.listen(this.port, () => {
      console.log('App running on port ' + this.port);
    });
  }

  async dbConnect() {
    try {
      //create a new database
      await createDatabase();

      // createDatabase();
      await sequelize.authenticate();
      console.log('connection has been established successfully');
    } catch (error) {
      console.log('Unable to connect to database: ' + error);
    }
  }
}

export default Server;
