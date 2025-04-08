import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

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
  }, {
    tableName: 'Users',
    timestamps: true,
  });
};