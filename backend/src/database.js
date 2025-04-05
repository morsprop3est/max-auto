import { Sequelize } from 'sequelize';
import 'dotenv/config';
import { setupAssociations } from './models/associations.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
});

const models = setupAssociations(sequelize);

export { sequelize, models };