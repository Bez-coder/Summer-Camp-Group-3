import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email in use' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name, role } });
    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (e) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (e) {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'No token' });
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone, bio: user.bio, avatarUrl: user.avatarUrl, rating: user.rating, ratingCount: user.ratingCount });
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Public user profile by id (limited fields)
router.get('/user/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true, phone: true, bio: true, avatarUrl: true, rating: true, ratingCount: true } })
    if (!user) return res.status(404).json({ message: 'Not found' })
    res.json(user)
  } catch (e) {
    res.status(400).json({ message: 'Invalid request' })
  }
})

// Rate a seller (buyers only)
router.post('/rate/:id', async (req, res) => {
  try {
    const auth = req.headers.authorization || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
    if (!token) return res.status(401).json({ message: 'No token' })
    const payload = jwt.verify(token, JWT_SECRET)
    // Only buyers can rate
    if (payload.role !== 'BUYER') return res.status(403).json({ message: 'Only buyers can rate' })
    const sellerId = Number(req.params.id)
    const { value } = req.body
    const ratingValue = Math.max(1, Math.min(5, Number(value)))
    const seller = await prisma.user.findUnique({ where: { id: sellerId } })
    if (!seller || seller.role !== 'SELLER') return res.status(404).json({ message: 'Seller not found' })
    // Ensure one rating per buyer per seller
    try {
      await prisma.rating.create({ data: { sellerId, buyerId: payload.sub, value: ratingValue } })
    } catch (e) {
      return res.status(409).json({ message: 'You already rated this seller' })
    }
    // Recompute average
    const stats = await prisma.rating.groupBy({ by: ['sellerId'], where: { sellerId }, _avg: { value: true }, _count: { value: true } })
    const avg = stats[0]?._avg.value || 0
    const cnt = stats[0]?._count.value || 0
    const updated = await prisma.user.update({ where: { id: sellerId }, data: { rating: avg, ratingCount: cnt } })
    res.json({ rating: updated.rating, ratingCount: updated.ratingCount })
  } catch (e) {
    res.status(400).json({ message: 'Rating failed' })
  }
})

router.put('/profile', async (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'No token' });
    const payload = jwt.verify(token, JWT_SECRET);
    const { name, phone, bio, avatarUrl } = req.body;
    const user = await prisma.user.update({ where: { id: payload.sub }, data: { name, phone, bio, avatarUrl } });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone, bio: user.bio, avatarUrl: user.avatarUrl });
  } catch (e) {
    res.status(400).json({ message: 'Profile update failed' });
  }
});

export default router;


