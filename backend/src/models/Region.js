import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Region', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { 
      type: DataTypes.STRING,
    },
    area: { 
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Regions',
  });
};
