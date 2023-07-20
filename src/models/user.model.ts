import prisma from '../config/database';
import { UserAuth } from '../types';

export async function createUser(
	fullname: string,
	email: string,
	password: string
): Promise<UserAuth> {
	const user = await prisma.user.create({
		data: {
			fullname,
			email,
			password,
		},
	});
	return user;
}

export async function findUserByEmail(email: string): Promise<UserAuth | null> {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
}
