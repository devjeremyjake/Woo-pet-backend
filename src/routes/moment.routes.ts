import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { cloudinaryParser } from '../../middleware/cloudinary';
import { store, momentsByUser, deleteMoment } from '../controllers/moment.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/users/services/create:
 *   post:
 *     tags:
 *       - Moments
 *     name: Create moment
 *     summary: Create  moment
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *     responses:
 *       '201':
 *         description: Moment created successfully
 *       '403':
 *         description: No auth token
 *       '422':
 *         description: Unprocessed entity
 *       '500':
 *         description: Internal server error
 */
router.post('/moments/create', authenticate, cloudinaryParser.single('image'), store);

/**
 * @swagger
 * /api/moments:
 *   get:
 *     tags:
 *       - Moments
 *     name: Fetch all user's moments
 *     summary: Fetch all user's moments
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
router.get('/users/moments', authenticate, momentsByUser);

/**
 * @swagger
 * /api/users/moments/delete/{id}:
 *   delete:
 *     tags:
 *       - Moments
 *     name: User delete moment
 *     summary: User delete moment
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
router.delete('/moments/delete/:id', authenticate, deleteMoment);

export default router;
