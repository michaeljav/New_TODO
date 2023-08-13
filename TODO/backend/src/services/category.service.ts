import sequelize from '../db/connection/connectionSequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export default class CategoryService {
  constructor() {}

  async create(username: string, description: string) {
    console.log('MICHAEL DATOS ', username, description);
    //save user in the database
    try {
      //validate if username already exists in the database
      const user = await sequelize.models.User.findOne({
        where: { userName: username },
      });

      // console.log('MICHAEL DATOS usuraio', user);
      if (!user) {
        return { msg: ` Usuario Incorrecto ${username}  ` };
      }

      const { dataValues } = user;

      const res = await sequelize.models.Category.create({
        description: description,
        userId: dataValues.id,
      });

      // return { msg: ` Nota  ${JSON.stringify(res)} creada ` };
      return { msg: `  category  creada` };
    } catch (error) {
      throw new Error(`Upps ocurrio un error ${error}`);
    }
  }

  async findAllByUser(username: string) {
    //validate username exists in the database
    const user: any = await sequelize.models.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return { msg: ` Usuario ${username} no existe  ` };
    }
    const { dataValues } = user;
    //category
    const categories: any = await sequelize.models.Category.findAll({
      where: { userId: dataValues.id },
    });

    return [{ msg: ``, data: categories }];
  }

  async findById(username: string, id: string) {
    //validate username exists in the database
    const user: any = await sequelize.models.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return { msg: ` Usuario ${username} no existe  ` };
    }
    const { dataValues } = user;
    //category
    const category = await sequelize.models.Category.findOne({
      where: { id: id, userId: dataValues.id },
    });

    return [{ msg: ``, data: category }];
  }

  async update(username: string, id: string, body: any) {
    const { description } = body;
    // console.log('MICHAEL DATOS ', username, description);
    //save user in the database
    try {
      //validate if username already exists in the database
      const user = await sequelize.models.User.findOne({
        where: { userName: username },
      });

      // console.log('MICHAEL DATOS usuraio', user);
      if (!user) {
        return { msg: ` Usuario Incorrecto ${username}  ` };
      }
      const { dataValues } = user;

      const categoryToUpdate = await sequelize.models.Category.findOne({
        where: { id: id, userId: dataValues.id },
      });

      // console.log('MICHAEL DATOS updated', categoryToUpdate);
      const res = await categoryToUpdate.update({
        description: description,
      });

      // return { msg: ` Nota  ${JSON.stringify(res)} creada ` };
      return { msg: ` category  modificada ` };
    } catch (error) {
      throw new Error(`Upps ocurrio un error ${error}`);
    }
  }
  async _delete(username: string, id: number) {
    //save user in the database
    try {
      //validate if username already exists in the database
      const user = await sequelize.models.User.findOne({
        where: { userName: username },
      });

      // console.log('MICHAEL DATOS usuraio', user);
      if (!user) {
        return { msg: ` Usuario Incorrecto ${username}  ` };
      }
      const { dataValues } = user;

      const categoryToUpdate = await sequelize.models.Category.findOne({
        where: { id: id, userId: dataValues.id },
      });

      const categoryNote = await sequelize.models.CategoryNote.findAll({
        where: { categoryId: id, userId: dataValues.id },
      });
      if (categoryNote.length > 0) {
        return { msg: ` No eliminar categoria tiene notas asignadas ` };
      }
      // console.log('MICHAEL NO PUEDE BORRAR', categoryNote, {
      //   categoryId: id,
      //   userId: dataValues.id,
      // });

      // console.log('MICHAEL DATOS categoryToUpdate', categoryToUpdate);
      //si tiene notas no puede borrarlo  mjm debe de hacerlo

      const categoryDeleted = await sequelize.models.Category.destroy({
        where: { id: categoryToUpdate.id },
      });

      // return { msg: ` Nota cantidad  ${JSON.stringify(categoryDeleted)} eliminada ` };
      return { msg: ` category eliminada ` };
    } catch (error) {
      throw new Error(`Upps ocurrio un error ${error}`);
    }
  }
}
