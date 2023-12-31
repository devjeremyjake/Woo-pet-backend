import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { cloudinaryParser } from '../../middleware/cloudinary';
import { storeService, showService, servicesByUser, deleteService, fetchServicesNearYou, suggestedServicesForUser } from '../controllers/service.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/users/services/create:
 *   post:
 *     tags:
 *       - Service
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
 *       - Service
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
 *       - Service
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

/**
 * @swagger
 * /api/users/services/nearest:
 *   get:
 *     tags:
 *       - Service
 *     name: Show services near you
 *     summary: Show services near you
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: lat
 *         type: number
 *         description: Latitude of current user
 *         required: true
 *       - in: query
 *         name: lng
 *         type: number
 *         description: Longitude of current user
 *         required: true
 *       - in: query
 *         name: page
 *         type: number
 *         value: 1
 *         required: true
 *       - in: query
 *         name: page_size
 *         description: number of record to show per page
 *         type: number
 *         value: 10
 *         required: true
 *       - in: query
 *         name: distance
 *         description: distance in kilometre
 *         type: number
 *         value: 10
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/users/services/nearest', fetchServicesNearYou);

/**
 * @swagger
 * /api/users/services/suggested:
 *   get:
 *     tags:
 *       - Service
 *     name: Suggest services for user
 *     summary: Suggest services for user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         type: number
 *         value: 1
 *         required: true
 *       - in: query
 *         name: page_size
 *         description: number of record to show per page
 *         type: number
 *         value: 10
 *         required: true
 *       - in: query
 *         name: category
 *         description: service category (e.g dog-walking)
 *         type: string
 *         example: dog-walking
 *         required: true
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/users/services/suggested', suggestedServicesForUser);

export default router;
