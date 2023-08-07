import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { addnewService } from '../controllers/service.controller';

const router: Router = Router();

router.post('/add', authenticate, addnewService);

export default router;
