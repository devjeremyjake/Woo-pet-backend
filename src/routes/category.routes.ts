import { Router } from 'express';

import { authenticate } from '../../middleware/authenticate';
import {
	addnewCategory,
	getAllCategory,
} from '../controllers/category.controller';

const router: Router = Router();

router.post('/addNew', addnewCategory);
router.get('/fetchCategories', getAllCategory);

export default router;
