import UserModel from './User.js';
import OrderModel from './Order.js';
import ComponentModel from './Component.js';
import CalculatorModel from './Calculator.js';
import ReviewModel from './Review.js';
import RegionModel from './Region.js';
import StatModel from './Stat.js';

export const setupAssociations = (sequelize) => {
  const User = UserModel(sequelize);
  const Order = OrderModel(sequelize);
  const Component = ComponentModel(sequelize);
  const Calculator = CalculatorModel(sequelize);
  const Review = ReviewModel(sequelize);
  const Region = RegionModel(sequelize);
  const Stat = StatModel(sequelize);

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  Region.hasMany(Review, { foreignKey: 'regionId' });
  Review.belongsTo(Region, { foreignKey: 'regionId' });

  return {
    User,
    Order,
    Component,
    Calculator,
    Review,
    Region,
    Stat,
  };
};