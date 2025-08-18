import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const payload = req.body;

  try {
    const listing = await prisma.listing.create({
      data: payload,
    });
    res.status(201).json(listing);
  } catch (err) {
    console.error('Error creating listing:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
