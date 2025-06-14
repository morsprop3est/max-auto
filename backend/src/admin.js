import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './database.js';
import { Order, Lot, Component, Calculator, Review, Region, ReviewPhoto, AuctionLocation, Port } from './models/index.js';
import { ComponentLoader } from 'adminjs';

AdminJS.registerAdapter(AdminJSSequelize);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

const UserPhotoUpload = componentLoader.add('UserPhotoUpload', path.join(__dirname, './components/UserPhotoUpload.jsx'));
const LotPhotoUpload = componentLoader.add('LotPhotoUpload', path.join(__dirname, './components/LotPhotoUpload.jsx'));
const ReviewPhotoUpload = componentLoader.add('ReviewPhotoUpload', path.join(__dirname, './components/ReviewPhotoUpload.jsx'));
const MainDashboard = componentLoader.add(
  'MainDashboard',
  path.join(__dirname, './components/MainDashboard.js')
);

const publicUrl = process.env.NEXT_PUBLIC_URL;

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  branding: {
    companyName: 'Maks Auto - Авто з США',
    logo: '/public/logo.svg',
    favicon: '/public/favicon.ico',
    theme: {
      colors: {
        primary100: '#038405',
        primary80: '#038405',
        primary60: '#038405',
        primary40: '#038405',
        primary20: '#038405',
      },
    },
  },
  env: {
    PUBLIC_URL: publicUrl,
  },
  componentLoader,
  dashboard: {
    component: MainDashboard,
  },
  resources: [
    { resource: Order, options: { navigation: 'Заявки' } },
    {
      resource: Lot,
      options: {
        properties: {
          photos: {
            isVisible: { list: false, edit: true, show: true },
            components: {
              edit: LotPhotoUpload,
            },
          },
        },
      },
    },
    { resource: Component, options: { navigation: 'Компоненти' } },
    { resource: Calculator, options: { navigation: 'Калькулятор' } },
    {
      resource: Review,
      options: {
        properties: {
          userPhoto: {
            components: {
              edit: UserPhotoUpload, 
            },
          },
          reviewPhotos: {
            isVisible: { list: false, edit: true, show: true },
            components: {
              edit: ReviewPhotoUpload, 
            },
          },
        },
      },
    },
    { resource: Region, options: { navigation: 'Регіони' } },
    {
      resource: AuctionLocation,
      options: {
        navigation: 'Аукціони',
        properties: {
          portId: { isVisible: false },
          auctionType: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            availableValues: [
              { value: 'copart', label: 'Copart' },
              { value: 'iaai', label: 'IAAI' }
            ]
          }
        },
        listProperties: ['id', 'name', 'auctionType'],
        showProperties: ['id', 'name', 'auctionType'],
        editProperties: ['name', 'auctionType'], 
      },
    },
    {
      resource: Port,
      options: {
        navigation: 'Порти',
        properties: {
          auctionLocations: { isVisible: false },
        },
        listProperties: ['id', 'name'],
        showProperties: ['id', 'name'],
        editProperties: ['name'],
      },
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
  cookiePassword: process.env.COOKIE_SECRET,
}, null, {
  resave: false,
  saveUninitialized: false,
  secret: process.env.ADMIN_COOKIE_SECRET,
});

adminJs.watch();

export { adminJs, adminRouter };