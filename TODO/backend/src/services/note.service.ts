import sequelize from '../db/connection/connectionSequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { Op } from 'sequelize';

export default class NoteService {
  constructor() {}

  async create(username: string, body: any) {
    // console.log('MICHAEL DATOS ', username, description);
    const { title, description, achived, categoriesId } = body;
    const t = await sequelize.transaction();
    //save user in the database
    try {
      //validate if username already exists in the database
      const user = await sequelize.models.User.findOne({
        where: { userName: username },
      });

      // console.log('MICHAEL DATOS usuraio', user);
      if (!user) {
        return { msg: `Usuario Incorrecto ${username}  ` };
      }

      const { dataValues } = user;

      const res = await sequelize.models.Note.create(
        {
          title: title,
          description: description,
          userId: dataValues.id,
          achived: achived,
        },
        { transaction: t }
      );

      for (const categid of categoriesId) {
        const category = await sequelize.models.Category.findOne({
          where: { Id: categid, userId: dataValues.id },
        });

        if (!category) {
          console.log('michael catego ', category);
          await t.rollback();
          return { msg: `${categid} Categoria no existe ` };
        }

        await sequelize.models.CategoryNote.create(
          {
            noteId: res.id,
            categoryId: categid,
            userId: dataValues.id,
          },
          { transaction: t }
        );
      }

      await t.commit();
      // return { msg: ` Nota  ${JSON.stringify(res)} creada ` };
      return { msg: ` Nota  creada ` };
    } catch (error) {
      await t.rollback();
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
    const notes: any = await sequelize.models.Note.findAll({
      where: { userId: dataValues.id, achived: false },
    });

    // console.log('MICHAEL TODOS  ', user);
    let noteAndCategory = [];
    if (notes) {
      for (const note of notes) {
        // console.log('MICHAEL NOTE ', note.dataValues.id, dataValues.id);
        const categories = await sequelize.models.CategoryNote.findAll({
          where: { noteId: note.dataValues.id, userId: dataValues.id },
        });
        // console.log('MICHAEL NOTE ', categories);
        noteAndCategory.push({ ...note.dataValues, categories });
      }
    } else {
      noteAndCategory.push({ ...notes.dataValues });
    }

    return { msg: ``, data: noteAndCategory };
  }

  async findAllByUserAchived(username: string) {
    //validate username exists in the database
    const user: any = await sequelize.models.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return { msg: ` Usuario ${username} no existe  ` };
    }
    const { dataValues } = user;
    //category
    const notes: any = await sequelize.models.Note.findAll({
      // where: { [Op.and]: [{ userId: dataValues.id }, { achived: 'true' }] },
      where: { userId: dataValues.id, achived: true },
    });
    // console.log('MICHAEL ENTRO FILTER ', notes);
    // debug();

    let noteAndCategory = [];
    if (notes) {
      for (const note of notes) {
        // console.log('MICHAEL NOTE ', note.dataValues.id, dataValues.id);
        const categories = await sequelize.models.CategoryNote.findAll({
          where: { noteId: note.dataValues.id, userId: dataValues.id },
        });
        // console.log('MICHAEL NOTE ', categories);
        noteAndCategory.push({ ...note.dataValues, categories });
      }
    } else {
      noteAndCategory.push({ ...notes.dataValues });
    }

    return { msg: ``, data: noteAndCategory };
  }

  async findAllByUserAndCategory(username: string, body: any) {
    const { categoriesId } = body;
    //validate username exists in the database
    const user: any = await sequelize.models.User.findOne({
      where: { userName: username },
    });

    if (!user) {
      return { msg: ` Usuario ${username} no existe  ` };
    }
    const { dataValues } = user;
    //category
    const notesIdAndCategId: any = await sequelize.models.CategoryNote.findAll({
      where: {
        [Op.and]: [{ userId: dataValues.id }, { categoryId: categoriesId }],
      },
    });

    let noteAndCategory = [];
    if (notesIdAndCategId) {
      for (const notIdAndCatId of notesIdAndCategId) {
        const categories = await sequelize.models.Category.findAll({
          where: { id: notIdAndCatId.dataValues.categoryId },
        });
        const notes = await sequelize.models.Note.findAll({
          where: { id: notIdAndCatId.dataValues.noteId },
        });

        // console.log('MICHAEL NOTE ', categories);
        // noteAndCategory.push({ ...noteAndCategory.dataValues, categories });
      }
    } else {
      // noteAndCategory.push({ ...notes.dataValues });
    }

    return { msg: ``, data: noteAndCategory };
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
    const note = await sequelize.models.Note.findOne({
      where: { id: id, userId: dataValues.id },
    });

    let noteAndCategory = [];

    if (note) {
      // console.log('MICHAEL NOTE ', note.dataValues.id, dataValues.id);
      const categories = await sequelize.models.CategoryNote.findAll({
        where: { noteId: note.dataValues.id, userId: dataValues.id },
      });
      // console.log('MICHAEL NOTE ', categories);
      noteAndCategory.push({ ...note.dataValues, categories });
    }

    return { msg: ``, data: noteAndCategory };
  }

  async update(username: string, id: string, body: any) {
    const { title, description, achived, categoriesId, updatedAt } = body;
    console.log('MICHAEL ', body);
    // debug();
    const t = await sequelize.transaction();
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

      const noteToUpdate = await sequelize.models.Note.findOne({
        where: { id: id, userId: dataValues.id },
      });

      // console.log('MICHAEL DATOS updated', noteToUpdate);
      const res = await noteToUpdate.update(
        {
          title: title,
          description: description,
          achived: achived,
          updatedAt: updatedAt,
        },
        { transaction: t }
      );

      //delete categorynote
      const noteDeleted = await sequelize.models.CategoryNote.destroy({
        where: { noteId: noteToUpdate.id, userId: dataValues.id },
        transaction: t,
      });

      //I add again to categorynote
      for (const categid of categoriesId) {
        const category = await sequelize.models.Category.findOne({
          where: { Id: categid, userId: dataValues.id },
        });

        if (!category) {
          // console.log('michael catego ', category);
          await t.rollback();
          return { msg: `${categid} Categoria no existe ` };
        }

        await sequelize.models.CategoryNote.create(
          {
            noteId: res.id,
            categoryId: categid,
            userId: dataValues.id,
          },
          { transaction: t }
        );
      }

      // let c = true;
      // if (c) throw new Error(`Invalid`);
      t.commit();
      // return { msg: ` Nota  ${JSON.stringify(res)} creada ` };
      return { msg: ` nota  modificada ` };
    } catch (error) {
      t.rollback();
      throw new Error(`Upps ocurrio un error ${error}`);
    }
  }
  async _delete(username: string, id: number) {
    const t = await sequelize.transaction();
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

      const noteToUpdate = await sequelize.models.Note.findOne({
        where: { id: id, userId: dataValues.id },
      });

      // console.log('MICHAEL DATOS categoryToUpdate', noteToUpdate);
      //si tiene notas no puede borrarlo  mjm debe de hacerlo

      const noteDeleted = await sequelize.models.Note.destroy({
        where: { id: noteToUpdate.id },
        transaction: t,
      });

      //delete categorynote
      await sequelize.models.CategoryNote.destroy({
        where: { noteId: noteToUpdate.id, userId: dataValues.id },
        transaction: t,
      });
      // let c = true;
      // if (c) throw new Error(`Invalid`);
      t.commit();
      // return { msg: ` Nota cantidad  ${JSON.stringify(categoryDeleted)} eliminada ` };
      return { msg: ` nota eliminada ` };
    } catch (error) {
      t.rollback();
      throw new Error(`Upps ocurrio un error ${error}`);
    }
  }
}
