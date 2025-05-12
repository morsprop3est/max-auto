import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('BodyType', {
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
    tableName: 'BodyTypes',
    timestamps: false,
  });
};