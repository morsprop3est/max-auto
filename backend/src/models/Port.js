import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Port', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'Ports',
    timestamps: false,
  });
};