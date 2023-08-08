import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET || 'jwtTokenSecret';

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) {
		return res
			.status(401)
			.json({ error: true, message: 'Authentication required' });
	}
	try {
		const decoded = jwt.verify(token, jwtSecret) as { userId: string };
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ error: true, message: 'Invalid or expired token' });
	}
};
