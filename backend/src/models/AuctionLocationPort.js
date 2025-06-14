import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define('AuctionLocationPort', {
    auctionLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'AuctionLocations', key: 'id' }
    },
    portId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Ports', key: 'id' }
    }
  }, {
    tableName: 'AuctionLocationPorts',
    timestamps: false,
  });
};