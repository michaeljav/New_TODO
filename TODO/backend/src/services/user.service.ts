import sequelize from '../db/connection/connectionSequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
export default class UserService {
  constructor() {}

  async create(username: string, password: string) {
    //save user in the database
    try {
      //validate if username already exists in the database
      const user = await sequelize.models.User.findOne({
        where: { userName: username },
      });

      if (user) {
        return { msg: ` Ya existe un Usuario ${username}  ` };
      }

      //encriptar
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await sequelize.models.User.create({
        userName: username,
        password: hashedPassword,
      });

      return { msg: ` Usuario ${username} Creado ` };
    } catch (error) {
      throw new Error(`Upps ocurrio un error ${error}`);
    }
  }

  async login(username: string, password: string) {
    // console.log('MICHAEL USUARIO A BUSCAR EN BASE ', username);
    //validate username exists in the database
    const user: any = await sequelize.models.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return { msg: ` Usuario ${username} no existe  ` };
    }

    const { dataValues } = user;
    //validate password
    const passValid = await bcrypt.compare(password, dataValues.password);
    if (!passValid) {
      return { msg: ` Password in correcta  ` };
    }

    //generate token

    const token = jwt.sign(
      {
        username: dataValues.userName,
      },
      config.jwtSecretKey,
      {
        expiresIn: '24h',
      }
    );
    return { msg: ``, userName: dataValues.userName, token: token };
  }

  async findAllUser(username: string) {
    //validate username exists in the database
    const user: any = await sequelize.models.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return { msg: ` Usuario ${username} no existe  ` };
    }
    const { dataValues } = user;
    //category
    const users: any = await sequelize.models.User.findAll();

    return { msg: ``, data: users };
  }

  async findById(username: string) {
    //validate username exists in the database
    const user: any = await sequelize.models.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return { msg: ` Usuario ${username} no existe  ` };
    }
    const { dataValues } = user;

    return { msg: ``, data: dataValues };
  }
}
