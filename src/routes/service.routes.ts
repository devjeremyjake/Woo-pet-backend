import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { cloudinaryParser } from '../../middleware/cloudinary';
import { storeService, showService, servicesByUser, deleteService } from '../controllers/service.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/users/services/create:
 *   post:
 *     tags:
 *       - User
 *     name: Create service
 *     summary: Create  service
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: picture
 *         type: file
 *         required: true
 *       - in: formData
 *         name: price
 *         type: number
 *         format: float64
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *       - in: formData
 *         name: experience
 *         type: string
 *         required: false
 *       - in: formData
 *         name: lat
 *         type: number
 *         format: float64
 *         required: true
 *       - in: formData
 *         name: lng
 *         type: number
 *         format: float64
 *         required: true
 *       - in: formData
 *         name: categoryId
 *         type: string
 *         required: true
 *     responses:
 *       '201':
 *         description: Service created successfully
 *       '403':
 *         description: No auth token
 *       '422':
 *         description: Unprocessed entity
 *       '500':
 *         description: Internal server error
 */
router.post('/users/services/create', authenticate, cloudinaryParser.single('picture'), storeService);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     tags:
 *       - Service
 *     name: Show service
 *     summary: Show service
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
router.get('/services/:id', showService);

/**
 * @swagger
 * /api/users/services:
 *   get:
 *     tags:
 *       - User
 *     name: Fetch all user's services
 *     summary: Fetch all user's services
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
 *       500:
 *         description: Internal server error
 */
router.get('/users/services', authenticate, servicesByUser);

/**
 * @swagger
 * /api/users/services/delete/{id}:
 *   delete:
 *     tags:
 *       - User
 *     name: User delete service
 *     summary: User delete service
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
router.delete('/users/services/delete/:id', authenticate, deleteService);

export default router;
