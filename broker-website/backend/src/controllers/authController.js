
import { AuthService } from "../services/authService.js";



export class AuthController {
  static async register(req, res, next) {
    try {
      const role = req.path === "/register/seller" ? "SELLER" : "BUYER";
      
      const result = await AuthService.register({...req.body,role});
      res.status(201).json({
        message: 'User registered successfully',
        success:true,
        ...result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    next()
  }

  static async signin(req, res, next) {
    try {

        const { email, password } = req.body;

      const result = await AuthService.signin(email, password);
      res.json({
        message: 'Signin successful',
        success:true,
        ...result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    next()
  }

  static async getProfile(req, res, next) {
    try {
      const user = await AuthService.getUserById(req.user.id);
      res.json({ user });
    } catch (error) {
     res.status(400).json({ message: error.message });
    }
    next()
  }
}

