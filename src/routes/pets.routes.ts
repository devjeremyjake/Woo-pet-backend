import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { store, fetchUserPets } from '../controllers/pets.controller';

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
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             badBehaviour:
 *               type: string
 *             goodBehaviour:
 *               type: string
 *             vaccinations:
 *               type: string
 *             gender:
 *               type: string
 *             weight:
 *               type: string
 *             age:
 *               type: string
 *         required:
 *           - name
 *           - email
 *           - password
 *           - long
 *           - lat
 *           - city
 *           - country
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessed entities | Validation error
 *       500:
 *         description: Internal server error
 */
router.post('users/pets/store', authenticate, store);

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
