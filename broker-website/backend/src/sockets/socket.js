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

router.get('/conversations', auth, async (req, res) => {
  const chats = await prisma.chat.findMany({
    where: { OR: [{ buyerId: req.user.sub }, { sellerId: req.user.sub }] },
    include: { messages: { orderBy: { createdAt: 'desc' }, take: 1 }, listing: true, buyer: true, seller: true },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(chats);
});

router.post('/start', auth, async (req, res) => {
  const { sellerId, listingId } = req.body;
  const existing = await prisma.chat.findFirst({ where: { buyerId: req.user.sub, sellerId: Number(sellerId), listingId: listingId ? Number(listingId) : undefined } });
  if (existing) return res.json(existing);
  const chat = await prisma.chat.create({ data: { buyerId: req.user.sub, sellerId: Number(sellerId), listingId: listingId ? Number(listingId) : null } });
  res.status(201).json(chat);
});

router.get('/:chatId/messages', auth, async (req, res) => {
  const chatId = Number(req.params.chatId);
  const messages = await prisma.message.findMany({ where: { chatId }, orderBy: { createdAt: 'asc' } });
  res.json(messages);
});

router.post('/:chatId/messages', auth, async (req, res) => {
  const chatId = Number(req.params.chatId);
  const chat = await prisma.chat.findUnique({ where: { id: chatId } });
  if (!chat) return res.status(404).json({ message: 'Chat not found' });
  if (![chat.buyerId, chat.sellerId].includes(req.user.sub)) return res.status(403).json({ message: 'Forbidden' });
  const msg = await prisma.message.create({ data: { chatId, senderId: req.user.sub, content: req.body.content } });
  await prisma.notification.create({ data: { userId: req.user.sub === chat.buyerId ? chat.sellerId : chat.buyerId, title: 'New message', body: req.body.content } });
  res.status(201).json(msg);
});

export default router;


