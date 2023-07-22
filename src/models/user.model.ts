import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { UserInfo } from '../types/custom';

export interface UserUpdateInputField extends Prisma.UserUpdateInput {}

export interface UserCreateInput extends Prisma.UserCreateInput {}

export const createUser = async (user: any): Promise<UserInfo> => {
	return await prisma.user.create({ data: user });
};

export const findUserByEmail = async (
	email: string
): Promise<UserInfo | any> => {
	return await prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string): Promise<UserInfo | any> => {
	return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (
	email: string,
	data: UserUpdateInputField
): Promise<UserInfo> => {
	return await prisma.user.update({ where: { email }, data });
};
