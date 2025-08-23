import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signJwt } from '../utils/jwt';

const prisma = new PrismaClient();
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export class AuthService {
  static async register(data: { email: string; password: string; name?: string; role?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email already in use');
    const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hash,
        name: data.name || '',
  role: (data.role && ["BUYER","SELLER","ADMIN"].includes(data.role)) ? data.role as any : 'BUYER',
      },
      select: { id: true, email: true, name: true, role: true }
    });
    return { user };
  }

  static async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('Invalid credentials');
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    const token = signJwt({ id: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }

  static async getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, role: true } });
    if (!user) throw new Error('User not found');
    return user;
  }
}
