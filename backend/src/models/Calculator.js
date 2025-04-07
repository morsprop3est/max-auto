import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; 

export default (sequelize) => {
  return sequelize.define('Calculator', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formula: { 
      type: DataTypes.STRING,
    },
    coeffs: { 
      type: DataTypes.JSON,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Calculators',
  });
};
