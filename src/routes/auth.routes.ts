import { Router } from 'express';
import {
	forgotPassword,
	resetPassword,
	login,
	register,
	verifyOtp,
} from '../controllers/auth.controller';
import { authenticate } from '../../middleware/authenticate';

const router: Router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     name: Register user
 *     summary: Register a new user
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
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             long:
 *               type: number
 *               format: float
 *             lat:
 *               type: number
 *               format: float
 *             city:
 *               type: string
 *             country:
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
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessed entities | Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/auth/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     name: Login
 *     summary: Login
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
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthenticated
 *       422:
 *         description: Unprocessed entities
 *       500:
 *         description: Internal server error
 */
router.post('/auth/login', login);

router.post('/auth/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/auth/verifyOtp:
 *   post:
 *     tags:
 *       - Auth
 *     name: Verify account
 *     summary: Verify account
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
 *             otp:
 *               type: string
 *         required:
 *           - otp
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthenticated
 *       422:
 *         description: Unprocessed entities
 *       500:
 *         description: Internal server error
 */
router.post('/auth/verifyOtp', authenticate, verifyOtp);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     name: Reset password
 *     summary: Reset password
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
 *             password:
 *               type: string
 *         required:
 *           - password
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthenticated
 *       422:
 *         description: Unprocessed entities
 *       500:
 *         description: Internal server error
 */
router.post('/auth/reset-password', authenticate, resetPassword);

export default router;
