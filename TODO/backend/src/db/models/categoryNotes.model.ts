import { Model, DataTypes } from 'sequelize';

const TABLE_NAME = 'categoryNotes';
const MODEL_NAME = 'CategoryNote';

class CategoryNote extends Model {
  static config(sequelize: any) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: MODEL_NAME,
      timestamps: true,
    };
  }
}

const CategoryNoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  noteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'noteId',
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'categoryId',
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'userId',
  },
};

export { CategoryNote, CategoryNoteSchema };
