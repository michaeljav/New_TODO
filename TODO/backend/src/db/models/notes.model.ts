import { Model, DataTypes } from 'sequelize';

const TABLE_NAME = 'notes';
const MODEL_NAME = 'Note';

class Note extends Model {
  static config(sequelize: any) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: MODEL_NAME,
      timestamps: true,
    };
  }
}

const NoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'title',
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'description',
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'userId',
  },
  achived: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'achived',
  },
};

export { Note, NoteSchema };
