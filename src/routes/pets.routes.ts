import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { addNewPet, findUserPets } from '../controllers/pets.controller';

const router: Router = Router();
router.post('/new', authenticate, addNewPet);
router.get('/fetchallpets', authenticate, findUserPets);

export default router;
