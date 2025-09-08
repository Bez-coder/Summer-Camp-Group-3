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

router.get('/', auth, async (req, res) => {
  const list = await prisma.notification.findMany({ where: { userId: req.user.sub }, orderBy: { createdAt: 'desc' } });
  res.json(list);
});

router.post('/:id/read', auth, async (req, res) => {
  const id = Number(req.params.id);
  const notif = await prisma.notification.update({ where: { id }, data: { read: true } });
  res.json(notif);
});

export default router;


