import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';

import authRouter from './routes/auth.js';
import listingRouter from './routes/listings.js';
import chatRouter from './routes/chat.js';
import notificationsRouter from './routes/notifications.js';
import paymentRouter from './routes/payments.js';
import uploadsRouter from './routes/uploads.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRouter);
app.use('/api/listings', listingRouter);
app.use('/api/chat', chatRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/uploads', uploadsRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));


