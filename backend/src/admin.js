import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { sequelize, models } from './database.js';

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: models.User, 
      options: { navigation: 'Користувачі' },
    },
    {
      resource: models.Order,
      options: { navigation: 'Заявки' },
    },
    {
      resource: models.Component,
      options: { navigation: 'Компоненти' },
    },
    {
      resource: models.Calculator,
      options: { navigation: 'Калькулятор' },
    },
    {
      resource: models.Review,
      options: { navigation: 'Відгуки' },
    },
    {
      resource: models.Stat,
      options: { navigation: 'Статистика', actions: null },
    },
    {
      resource: models.Region,
      options: { navigation: 'Регіони' },
    },
  ],
});

// const adminRouter = AdminJSExpress.buildRouter(adminJs);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      return { email };
    }
    return null;
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.COOKIE_SECRET || 'some-secret',
}, null, {
  resave: false, 
  saveUninitialized: false,
  secret: process.env.ADMIN_COOKIE_SECRET || 'admin-secret',
});

  
export { adminJs, adminRouter };