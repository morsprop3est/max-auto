import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; 

export default (sequelize) => {
  return sequelize.define('Order', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { 
      type: DataTypes.STRING,
    },
    phone: { 
      type: DataTypes.STRING,
    },
    carDetails: { 
      type: DataTypes.STRING,
    },
    totalPrice: { 
      type: DataTypes.FLOAT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Orders',
    timestamps: false, 
  });
};