import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {
	createUser,
	findUserByEmail,
	findUserById,
	updateUser,
} from '../models/user.model';
import cookieToken from '../utils/cookieToken';
import { generateOtp } from '../utils/generateOtp';
import { verifyOtpValidity } from '../utils/verifyOtpValidity';

const register = async (req: Request, res: Response) => {
	const { name, email, password, long, lat, city, country } = req.body;
	const message = 'User created successfully';
	try {
		if (!name || !email || !password) {
			return res
				.status(422)
				.json({ error: true, message: 'Fields are  required' });
		}
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return res.status(203).json({ error: 'User already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const otp = generateOtp();

		const user = {
			name,
			email,
			hashedPassword,
			otp,
			otpExpiration: new Date(Date.now() + 20 * 60000),
			long,
			lat,
			city,
			country,
		};

		const newUser = await createUser(user);
		// send otp via email <last for 10 min>
		cookieToken(newUser, res, message);
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		if (!email || !password)
			return res
				.status(203)
				.json({ error: true, message: 'Fields are required' });

		const existingUser = await findUserByEmail(email);
		if (!existingUser)
			return res.status(203).json({ error: true, message: 'User not found' });
		const passwordMatch = await bcrypt.compare(
			password,
			existingUser.hashedPassword
		);
		if (!passwordMatch)
			return res.status(401).json({ error: 'Invalid credentials' });

		cookieToken(existingUser, res, 'Login successful');
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error', error });
	}
};

const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	try {
		const existingUser = findUserByEmail(email);
		if (!existingUser) {
			return res.status(203).json({ error: true, message: 'User not found' });
		}
		const otp = generateOtp();
		const updatedUser = await updateUser(email, {
			otp,
			otpExpiration: new Date(Date.now() + 20 * 1000),
		});
		// send to user email
		cookieToken(updatedUser, res, 'OTP sent successfully');
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

const verifySignupOtp = async (req: Request, res: Response) => {
	const { otp } = req.body;
	try {
		const userId = req.userId;
		const existingUser = await findUserById(userId);
		if (!existingUser)
			return res.status(203).json({ error: true, message: 'User not found' });

		// check if otp is same
		if (!verifyOtpValidity(existingUser, otp))
			return res.status(203).json({ error: 'Invalid OTP or OTP expired' });
		await updateUser(existingUser?.email, { isVerified: true });
		return res
			.status(200)
			.json({ error: false, message: 'OTP Verified Successfully' });
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

const verifyOtp = async (req: Request, res: Response) => {
	const { otp } = req.body;
	try {
		const userId = req.userId;
		const existingUser = await findUserById(userId);
		if (!existingUser)
			return res.status(203).json({ error: true, message: 'User not found' });

		// check if otp is same
		if (!verifyOtpValidity(existingUser, otp))
			return res.status(401).json({ error: 'Invalid OTP or OTP expired' });

		cookieToken(
			existingUser,
			res,
			'OTP verified successfully. Provide new password'
		);
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

const resetPassword = async (req: Request, res: Response) => {
	const { password } = req.body;
	try {
		const userId = req.userId;
		const existingUser = await findUserById(userId);
		if (!existingUser) {
			return res.status(203).json({ error: true, message: 'User not found' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		await updateUser(existingUser?.email, { hashedPassword });
		return res.status(200).json({ message: 'Password reset successful' });
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export {
	register,
	login,
	forgotPassword,
	verifySignupOtp,
	verifyOtp,
	resetPassword
};