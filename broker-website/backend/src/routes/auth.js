
import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import Authenticate from '../middleware/auth.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/register/seller', AuthController.register);
router.post('/signin', AuthController.signin);
router.post('/login', AuthController.signin);
router.get('/profile', Authenticate, AuthController.getProfile);

export default router;


