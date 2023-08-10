import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { upsertLike } from '../controllers/moment.controller';
import { getAllMomentComments } from '../controllers/comment.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/comments/create:
 *   post:
 *     tags:
 *       - Moments
 *     name: Add comment to moment
 *     summary: Add comment to moment
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
 *             userId:
 *               type: string
 *             momentId:
 *               type: string
 *             comment:
 *               type: string
 *         required:
 *           - userId
 *           - momentId
 *           - comment
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '403':
 *         description: No auth token
 *       '422':
 *         description: Unprocessed entity
 *       '500':
 *         description: Internal server error
 */
router.post('/comments/create', authenticate, upsertLike);

/**
 * @swagger
 * /api/moments/{id}/comments:
 *   get:
 *     tags:
 *       - Moments
 *     name: Fetch all moment's comments
 *     summary: Fetch all moment's comments
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
router.get('/moments/:id/comments', authenticate, getAllMomentComments);

export default router;
