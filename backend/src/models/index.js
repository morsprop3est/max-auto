import sequelize from '../database.js';
import OrderModel from './Order.js';
import LotModel from './Lot.js';
import LotPhotoModel from './LotPhoto.js';
import ComponentModel from './Component.js';
import ReviewModel from './Review.js';
import ReviewPhotoModel from './ReviewPhoto.js';
import RegionModel from './Region.js';
import AuctionLocationModel from './AuctionLocation.js';
import BodyTypeModel from './BodyType.js';
import FuelTypeModel from './FuelType.js';
import PortModel from './Port.js';
import AuctionLocationPortModel from './AuctionLocationPort.js';
import PortFeeModel from './PortFee.js';
import AuctionDeliveryFeeModel from './AuctionDeliveryFee.js';

const Order = OrderModel(sequelize);
const Lot = LotModel(sequelize);
const LotPhoto = LotPhotoModel(sequelize);
const AuctionLocation = AuctionLocationModel(sequelize);
const Component = ComponentModel(sequelize);
const Review = ReviewModel(sequelize);
const ReviewPhoto = ReviewPhotoModel(sequelize);
const Region = RegionModel(sequelize);
const BodyType = BodyTypeModel(sequelize);
const FuelType = FuelTypeModel(sequelize);
const Port = PortModel(sequelize);
const AuctionLocationPort = AuctionLocationPortModel(sequelize);
const PortFee = PortFeeModel(sequelize);
const AuctionDeliveryFee = AuctionDeliveryFeeModel(sequelize);


Order.belongsToMany(Lot, { through: 'OrderLots', foreignKey: 'orderId' });
Lot.belongsToMany(Order, { through: 'OrderLots', foreignKey: 'lotId' });

Region.hasMany(Review, { foreignKey: 'regionId' });
Review.belongsTo(Region, { foreignKey: 'regionId' });

Review.hasMany(ReviewPhoto, { foreignKey: 'reviewId', as: 'reviewPhotos' });
ReviewPhoto.belongsTo(Review, { foreignKey: 'reviewId' });

Lot.hasMany(LotPhoto, { foreignKey: 'lotId', as: 'photos' });
LotPhoto.belongsTo(Lot, { foreignKey: 'lotId' });

Lot.belongsTo(AuctionLocation, { foreignKey: 'locationId' });
AuctionLocation.hasMany(Lot, { foreignKey: 'locationId' });

Lot.belongsTo(BodyType, { foreignKey: 'bodyTypeId', as: 'bodyType' });
BodyType.hasMany(Lot, { foreignKey: 'bodyTypeId', as: 'lots' });

Lot.belongsTo(FuelType, { foreignKey: 'fuelTypeId', as: 'fuelType' });
FuelType.hasMany(Lot, { foreignKey: 'fuelTypeId', as: 'lots' });

Port.hasOne(PortFee, { foreignKey: 'portId', as: 'fee' });
PortFee.belongsTo(Port, { foreignKey: 'portId' });

AuctionLocation.hasOne(AuctionDeliveryFee, { foreignKey: 'auctionLocationId', as: 'fee' });
AuctionDeliveryFee.belongsTo(AuctionLocation, { foreignKey: 'auctionLocationId' });

AuctionLocation.belongsTo(Port, { foreignKey: 'portId', as: 'port' });
Port.hasMany(AuctionLocation, { foreignKey: 'portId', as: 'auctionLocations' });


export { sequelize, Order, Lot, Component, Review, Region, AuctionLocation, BodyType, FuelType, LotPhoto, ReviewPhoto, Port, AuctionLocationPort, PortFee, AuctionDeliveryFee };