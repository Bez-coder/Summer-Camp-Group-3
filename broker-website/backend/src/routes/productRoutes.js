import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get products by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const listings = await prisma.listing.findMany({
      where: { category },
      include: { owner: true },
    });

    res.json({ data: listings });
  } catch (err) {
    console.error('Error fetching products by category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
