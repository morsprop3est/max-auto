import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './models/index.js';
import componentRoutes from './routes/componentRoutes.js';
import calculatorRoutes from './routes/calculatorRoutes.js';
import { adminJs, adminRouter } from './admin.js';
import orderRoutes from './routes/orderRoutes.js';
import lotRoutes from './routes/lotRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import auctionLocationRoutes from './routes/auctionLocationRoutes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/components', componentRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auction-locations', auctionLocationRoutes);
app.use('/uploads', express.static('uploads'));

app.use(adminJs.options.rootPath, adminRouter);

await sequelize.sync({ alter: true });

export default app;