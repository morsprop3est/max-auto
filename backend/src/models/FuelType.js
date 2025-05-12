import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('FuelType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'FuelTypes',
    timestamps: false,
  });
};