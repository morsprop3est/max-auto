import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { 
      type: DataTypes.STRING,
      unique: true,
    },
    password: { 
      type: DataTypes.STRING,
    },
    isAdmin: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Users',
  });
};