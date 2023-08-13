import { Model, DataTypes } from 'sequelize';

const TABLE_NAME = 'users';
const MODEL_NAME = 'User';

class User extends Model {
  static config(sequelize: any) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: MODEL_NAME,
      timestamps: true,
    };
  }
}

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userName: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    field: 'userName',
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'password',
  },
};

export { User, UserSchema };
