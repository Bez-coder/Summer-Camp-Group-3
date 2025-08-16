// User service placeholder
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  static async getUsers() {
    return await prisma.user.findMany();
  }

  static async verifyToken(user) {
    
    return { valid: true, user };
  }
}
