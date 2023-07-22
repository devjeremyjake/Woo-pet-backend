import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { getProfile } from '../controllers/profile.controller';

const router: Router = Router();

router.get('/', authenticate, getProfile);

export default router;
