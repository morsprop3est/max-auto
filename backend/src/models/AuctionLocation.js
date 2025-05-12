import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('AuctionLocation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'AuctionLocations',
    timestamps: false,
  });
};