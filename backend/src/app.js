import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './models/index.js';
import { adminJs, adminRouter } from './admin.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import lotRoutes from './routes/lotRoutes.js';

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/public', express.static('public'));

await sequelize.sync({ alter: true });

app.use('/public', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/api', lotRoutes);
app.use(adminJs.options.rootPath, adminRouter);

export default app;