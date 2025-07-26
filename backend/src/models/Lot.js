import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Lot', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auctionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    odometer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    drive: {
      type: DataTypes.ENUM('4WD', 'RWD', 'FWD'),
      allowNull: true,
    },
    transmission: {
      type: DataTypes.ENUM('Automatic', 'Manual', 'CVT', 'Semi-Automatic'),
      allowNull: true,
    },
    color: {
      type: DataTypes.ENUM(
        'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 
        'Yellow', 'Orange', 'Purple', 'Brown', 'Beige', 'Pink', 'Gold', 'Bronze'
      ),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: true,
      defaultValue: 'active',
    },
    engineSize: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'AuctionLocations',
        key: 'id',
      },
      allowNull: true,
    },
    bodyTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BodyTypes',
        key: 'id',
      },
      allowNull: false,
    },
    fuelTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'FuelTypes',
        key: 'id',
      },
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Lots',
    timestamps: true,
  });
};