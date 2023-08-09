import { Router } from 'express';

import {
	getAll,
	store,
	edit,
	update,
	destroy
} from '../controllers/category.controller';

const router: Router = Router();

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
 *       203:
 *         description: Error
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
 * /api/categories/edit/{id}:
 *   get:
 *     tags:
 *       - Category
 *     name: Fetch all categories
 *     summary: List of all categories
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
 *       422:
 *         description: Unprocessed entities | Validation error
 *       500:
 *         description: Internal server error
 */
router.get('/categories/edit/:id', edit);

/**
 * @swagger
 * /api/categories/update/{id}:
 *   put:
 *     tags:
 *       - Category
 *     name: Update category
 *     summary: Update category
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
 *       202:
 *         description: Updated
 *       203:
 *         description: Error
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessed entities | Validation error
 *       500:
 *         description: Internal server error
 */
router.put('/categories/update/:id', update);

/**
 * @swagger
 * /api/categories/delete/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     name: Delete category
 *     summary: Delete category
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
 *       422:
 *         description: Unprocessed entities | Validation error
 *       500:
 *         description: Internal server error
 */
router.delete('/categories/delete/:id', destroy);

export default router;
