import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('AuctionDeliveryFee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    auctionLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'AuctionLocations', key: 'id' }
    },
    carFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },  
    suvFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },    
    motoFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },   
  }, {
    tableName: 'AuctionDeliveryFees',
    timestamps: false,
  });
};