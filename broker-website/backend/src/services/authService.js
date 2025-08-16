// AuthService placeholder. Implement register, login, getUserById methods here.
import { PrismaClient } from '@prisma/client';
import JwtGenerator from '../utils/jwtGenerator.js'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export class AuthService {
  static async register({name, email,password,phone,role}) {
// TODO: Implement register logic
       const user= await prisma.user.findUnique({where:{email}});

    if (user) throw new Error({
      success:false,
      messeage:"User already exists"
    });

          const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData={
          name,email,password:hashedPassword,phone
        }
        if(role){
          userData.role=role
        }
        const newUser=await prisma.user.create({data:userData});

        const token=JwtGenerator(newUser.id)
          
     return { user: newUser, token };
     
    }



   static async signin(email, password) {
   
    const user = await prisma.user.findUnique({
      where: { email }
    });

    
    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const isValidPassword=await bcrypt.compare(password,user.password);
    if(!isValidPassword){
      throw new Error("Incorrect email or password")
    }
    const token = JwtGenerator(user.id);

    console.log("User found:", user);
console.log("Input password:", password);
console.log("Stored password:", user?.password);

return {user,token };
  }
  static async getUserById(id) {
    // TODO: Implement get user by id logic

    const user=await prisma.user.findUnique({ where: { id } });
     if (!user) throw new Error('User not found');
    return user;
  }
}
