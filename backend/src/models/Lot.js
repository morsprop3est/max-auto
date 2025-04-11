import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Lot', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    auctionType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baseSite: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auctionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    odometer: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    priceNew: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    priceFuture: {
      type: DataTypes.FLOAT, 
      allowNull: true,
    },
    reservePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    costPriced: {
      type: DataTypes.FLOAT, 
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    vehicleType: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    fuel: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    drive: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transmission: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    engineSize: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  }, {
    tableName: 'Lots',
    timestamps: true, 
  });
};