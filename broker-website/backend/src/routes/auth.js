import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import Authenticate from '../middleware/auth.js';

const router = Router();

router.post('/register',Authenticate,AuthController.register);
router.post("/register/seller",Authenticate,AuthController.register);
router.post('/signin',Authenticate,AuthController.signin);
router.get('/profile', Authenticate, AuthController.getProfile);

export default router;


