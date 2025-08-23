import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import Authentication from '../middleware/authMiddleware.js';
const router=Router()

router.get('/',Authentication,UserController.getUsers);
router.get('/is-verify',Authentication,UserController.verifyToken);

export default router;
