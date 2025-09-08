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
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/', async (req, res) => {
  const { q, category } = req.query;
  const where = {};
  if (q) where.OR = [{ title: { contains: String(q), mode: 'insensitive' } }, { description: { contains: String(q), mode: 'insensitive' } }];
  if (category) where.category = String(category);
  const items = await prisma.listing.findMany({ where, include: { owner: true }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'SELLER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Forbidden' });
  const { title, description, priceBirr, category, imageUrl } = req.body;
  const created = await prisma.listing.create({ data: { title, description, priceBirr: Number(priceBirr), category, imageUrl, ownerId: req.user.sub } });
  res.status(201).json(created);
});

router.put('/:id', auth, async (req, res) => {
  const id = Number(req.params.id);
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return res.status(404).json({ message: 'Not found' });
  if (listing.ownerId !== req.user.sub && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Forbidden' });
  const updated = await prisma.listing.update({ where: { id }, data: req.body });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  const id = Number(req.params.id);
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return res.status(404).json({ message: 'Not found' });
  if (listing.ownerId !== req.user.sub && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Forbidden' });
  await prisma.listing.delete({ where: { id } });
  res.status(204).end();
});

export default router;


