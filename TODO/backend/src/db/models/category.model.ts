import { Model, DataTypes } from 'sequelize';

const TABLE_NAME = 'categories';
const MODEL_NAME = 'Category';

class Category extends Model {
  static config(sequelize: any) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: MODEL_NAME,
      timestamps: true,
    };
  }
}

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
};

export { Category, CategorySchema };
