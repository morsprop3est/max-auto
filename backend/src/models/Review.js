import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export default (sequelize) => {
  return sequelize.define('Review', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { 
      type: DataTypes.STRING,
    },
    rating: { 
      type: DataTypes.INTEGER,
    },
    comment: { 
      type: DataTypes.STRING,
    },
    photo: { 
      type: DataTypes.STRING,
    },
    regionId: { 
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'Reviews',
    timestamps: true,
  });
};