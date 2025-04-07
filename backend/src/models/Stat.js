import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; 

export default (sequelize) => {
  return sequelize.define('Stat', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { 
      type: DataTypes.STRING,
    },
    value: { 
      type: DataTypes.STRING,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Stats',
  });
};
