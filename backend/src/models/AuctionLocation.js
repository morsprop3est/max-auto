import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('AuctionLocation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    portId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Ports', key: 'id' }
    },
    auctionType: {
      type: DataTypes.ENUM('copart', 'iaai'),
      allowNull: false,
      defaultValue: 'copart'
    }
  }, {
    tableName: 'AuctionLocations',
    timestamps: false,
  });
};