import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { store, fetchUserPets } from '../controllers/pets.controller';
import { cloudinaryParser } from '../../middleware/cloudinary';

const router: Router = Router();

/**
 * @swagger
 * /api/users/pets/store:
 *   post:
 *     tags:
 *       - User
 *     name: Store pet
 *     summary: Store pet
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: type
 *         type: string
 *         required: true
 *       - in: formData
 *         name: badBehaviour
 *         type: array
 *         items:
 *           type: string
 *         required: true
 *       - in: formData
 *         name: goodBehaviour
 *         type: array
 *         items:
 *           type: string
 *         required: true
 *       - in: formData
 *         name: vaccinations
 *         type: array
 *         items:
 *           type: string
 *         required: true
 *       - in: formData
 *         name: gender
 *         type: string
 *         required: true
 *       - in: formData
 *         name: weight
 *         type: string
 *         required: true
 *       - in: formData
 *         name: age
 *         type: string
 *         required: true
 *     responses:
 *       201:
 *         description: Created
 *       203:
 *         description: Error
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessed entities | Validation error
 *       500:
 *         description: Internal server error
 */
router.post('users/pets/store', authenticate, cloudinaryParser.single('image'), store);

/**
 * @swagger
 * /api/users/pets/all:
 *   get:
 *     tags:
 *       - User
 *     name: Fetch all user's pets
 *     summary: Fetch all user's pets
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessed entities | Validation error
 *       500:
 *         description: Internal server error
 */
router.get('/users/pets/all', authenticate, fetchUserPets);

export default router;
