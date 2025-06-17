import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './models/index.js';
import componentRoutes from './routes/componentRoutes.js';
import calculatorRoutes from './routes/calculatorRoutes.js';
import { adminJs, adminRouter } from './admin.js';
import orderRoutes from './routes/orderRoutes.js';
import lotRoutes from './routes/lotRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  const mimeTypes = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.bmp': 'image/bmp',
    '.tiff': 'image/tiff',
    '.ico': 'image/x-icon'
  };
  
  if (mimeTypes[ext]) {
    res.type(mimeTypes[ext]);
  }
  next();
});

// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:3000',
//   'http://dev.maks-auto.com.ua',
//   'https://dev.maks-auto.com.ua',
//   'http://api.maks-auto.com.ua',
//   'https://api.maks-auto.com.ua'
// ];

// // app.use(cors({
// //   origin: (origin, callback) => {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, origin);
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   credentials: true,
// // }));
app.use(cors({ credentials: true, origin: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(process.cwd(), 'public')))


app.use(express.json());
app.use(cookieParser());

app.use('/api/components', componentRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/locations', locationRoutes);
app.use('/uploads', express.static('uploads'));

app.use(adminJs.options.rootPath, adminRouter);

await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
await sequelize.sync({ force: false });
await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

export default app;
