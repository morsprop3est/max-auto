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
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
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