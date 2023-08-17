import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { store, fetchUserPets, deletePet, showPet } from '../controllers/pets.controller';
import { cloudinaryParser } from '../../middleware/cloudinary';

const router: Router = Router();

/**
 * @swagger
 * /api/users/pets/store:
 *   post:
 *     tags:
 *       - Pet
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
 *       - Pet
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

/**
 * @swagger
 * /api/users/pets/{id}:
 *   get:
 *     tags:
 *       - Pet
 *     name: Show pet
 *     summary: Show pet
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/users/pets/:id', showPet);

/**
 * @swagger
 * /api/users/pets/delete/{id}:
 *   delete:
 *     tags:
 *       - Pet
 *     name: User delete pet
 *     summary: User delete pet
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete('/users/pets/delete/:id', authenticate, deletePet);

export default router;
