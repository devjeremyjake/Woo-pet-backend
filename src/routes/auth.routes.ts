import { Router } from 'express';
import {
	forgotPassword,
	resetPassword,
	signIn,
	signUp,
	verifyOtp,
} from '../controllers/auth.controller';
import { authenticate } from '../../middleware/authenticate';

const router: Router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgot-password', forgotPassword);
router.post('/verifyOtp', authenticate, verifyOtp);
router.post('/reset-password', authenticate, resetPassword);

export default router;
