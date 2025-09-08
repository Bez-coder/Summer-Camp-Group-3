import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function auth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'No token' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); } catch { return res.status(401).json({ message: 'Invalid token' }); }
}

// Chapa integration stub: create a payment intent
router.post('/chapa/initiate', auth, async (req, res) => {
  const { amount } = req.body;
  const p = await prisma.payment.create({ data: { userId: req.user.sub, amount: Number(amount), provider: 'chapa', status: 'INITIATED' } });
  res.status(201).json({ payment: p, checkoutUrl: 'https://chapa.co/checkout/mock/' + p.id });
});

export default router;


