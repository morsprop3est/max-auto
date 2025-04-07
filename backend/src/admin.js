import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './database.js';
import { User, Order, Component, Calculator, Review, Region, Stat } from './models/index.js'; 

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: User, 
      options: { navigation: 'Користувачі' },
    },
    {
      resource: Order,
      options: { navigation: 'Заявки' },
    },
    {
      resource: Component,
      options: { navigation: 'Компоненти' },
    },
    {
      resource: Calculator,
      options: { navigation: 'Калькулятор' },
    },
    {
      resource: Review,
      options: { navigation: 'Відгуки' },
    },
    {
      resource: Stat,
      options: { navigation: 'Статистика', actions: null },
    },
    {
      resource: Region,
      options: { navigation: 'Регіони' },
    },
  ],
});

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