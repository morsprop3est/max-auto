import { DataTypes } from 'sequelize';

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
    userPhoto: { 
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Reviews',
    timestamps: true,
  });
};