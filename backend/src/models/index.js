import sequelize from '../database.js';
import OrderModel from './Order.js';
import LotModel from './Lot.js';
import ComponentModel from './Component.js';
import CalculatorModel from './Calculator.js';
import ReviewModel from './Review.js';
import RegionModel from './Region.js';

const Order = OrderModel(sequelize);
const Lot = LotModel(sequelize);
const Component = ComponentModel(sequelize);
const Calculator = CalculatorModel(sequelize);
const Review = ReviewModel(sequelize);
const Region = RegionModel(sequelize);

Order.belongsToMany(Lot, { through: 'OrderLots', foreignKey: 'orderId' });
Lot.belongsToMany(Order, { through: 'OrderLots', foreignKey: 'lotId' });

Region.hasMany(Review, { foreignKey: 'regionId' });
Review.belongsTo(Region, { foreignKey: 'regionId' });

export { sequelize, Order, Lot, Component, Calculator, Review, Region };