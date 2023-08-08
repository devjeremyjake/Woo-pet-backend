import { Router } from 'express';

import { authenticate } from '../../middleware/authenticate';
import {
	store,
	getAll,
} from '../controllers/category.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/categories/store:
 *   post:
 *     tags:
 *       - Category
 *     name: Store category
 *     summary: Add a new category
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
 *             description:
 *               type: string
 *         required:
 *           - name
 *           - description
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
router.post('/categories/store', store);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Category
 *     name: Fetch all categories
 *     summary: List of all categories
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
router.get('/categories', getAll);

export default router;
