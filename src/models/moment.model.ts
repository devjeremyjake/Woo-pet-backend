import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { MomentInfo } from '../types/custom';

interface MomentUpdateInput extends Prisma.MomentUpdateInput {}

const createMoment = async (item: any): Promise<MomentInfo> => {
	return await prisma.moment.create({ data: item });
};

const getAllUserMoments = async (
	userId: string
): Promise<MomentInfo | any> => {
	return await prisma.moment.findMany({
		where: { userId },
		include: {
			comments: true
		},
	});
};

const destroy = async (id: string): Promise<MomentInfo> => {
	return await prisma.moment.delete({
		where: { id },
		include: {
			comments: true
		},
	});
};

export {
	MomentUpdateInput,
	createMoment,
    getAllUserMoments,
    destroy
};