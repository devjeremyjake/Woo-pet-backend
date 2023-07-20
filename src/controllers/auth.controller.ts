import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/user.model';
import cookieToken from '../utils/cookieToken';

export const signUp = async (res: Response, req: Request) => {
	const { fullname, email, password } = req.body;
	const message = 'User created successfully';
	try {
		if (!fullname || !email || !password) {
			return res
				.status(403)
				.json({ error: true, message: 'Fields are  required' });
		}
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await createUser(fullname, email, hashedPassword);
		cookieToken(newUser, res, message);
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const signIn = () => {};
