import { Request, Response } from 'express';
import { findUserById } from '../models/user.model';

const getProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const existingUser = await findUserById(userId);
		if (!existingUser) return res.status(400).json({ error: true, message: 'User not found' });

		existingUser.hashedPassword = undefined;
		existingUser.otp = undefined;
		existingUser.otpExpiration = undefined;
		delete existingUser.password;
		return res.status(200).json({ error: false, user: existingUser });
	} catch (error: any) {
		return res.status(500).json({ message: 'Internal Server Error', error: error.message });
	}
};

export {
	getProfile
};