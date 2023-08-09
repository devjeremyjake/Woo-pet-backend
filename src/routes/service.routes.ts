import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { cloudinaryParser } from '../../middleware/cloudinary';
import { store } from '../controllers/service.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/user/services/create:
 *   post:
 *     tags:
 *       - Services
 *     name: Create service
 *     summary: Create  service
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             picture:
 *               type: binary
 *             price:
 *               type: string
 *             description:
 *               type: string
 *             experience:
 *               type: string
 *             categoryId:
 *               type: string
 *             lat:
 *               type: float
 *             lng:
 *               type: float
 *         required:
 *           - image
 *           - price
 *           - description
 *           - experience
 *           - categoryId
 *           - lat
 *           - lng
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
router.post('/services/create', authenticate, cloudinaryParser.single('picture'), store);

export default router;
