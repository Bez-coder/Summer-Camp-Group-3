import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import multer from 'multer'

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
const upload = multer()


//const userRoutes=require('./routes/userRoutes')
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/auth.js';

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use('/api/auth',upload.none(), userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
