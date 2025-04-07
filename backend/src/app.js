import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { adminJs, adminRouter } from './admin.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/public', publicRoutes);
app.use('/admin', adminRoutes);
app.use(adminJs.options.rootPath, adminRouter);

export default app;