import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { MomentInfo, CommentInfo } from '../types/custom';

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

const likeOrUnlike = async (id: string, userId: string, like: boolean): Promise<MomentInfo | any> => {
	var moment = await prisma.moment.findUnique({
		where: { id },
		include: {
			comments: true
		},
	});

	if (!moment) return {};

	let updatedLikes = [...moment.likes];

	if (like && !updatedLikes.includes(userId)) updatedLikes.push(userId);
	if (!like && updatedLikes.includes(userId)) updatedLikes = updatedLikes.filter(item => item !== userId);

	// Update moment
	return await prisma.moment.update({
		where: { id },
		data: {
			likes: updatedLikes
		}
	});
};

export {
	MomentUpdateInput,
	createMoment,
    getAllUserMoments,
    destroy,
	likeOrUnlike
};