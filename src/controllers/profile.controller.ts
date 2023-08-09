import { Request, Response } from 'express';
import { findUserById } from '../models/user.model';

export const getProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const existingUser = await findUserById(userId);
		if (!existingUser) return res.status(400).json({ error: true, message: 'User not found' });

		existingUser.hashedPassword = undefined;
		existingUser.otp = undefined;
		existingUser.otpExpiration = undefined;
		return res.status(200).json({ error: false, user: existingUser });
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
