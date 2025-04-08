import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export default (sequelize) => {
  return sequelize.define('Component', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: { 
      type: DataTypes.STRING,
    },
    text: { 
      type: DataTypes.STRING,
    },
    photoUrl: { 
      type: DataTypes.STRING,
    },
    videoUrl: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Components',
    timestamps: true,
  });
};