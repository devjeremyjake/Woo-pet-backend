import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { getProfile } from '../controllers/profile.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - User
 *     name: Profile
 *     summary: Profile
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
router.get('/users/profile', authenticate, getProfile);

export default router;
