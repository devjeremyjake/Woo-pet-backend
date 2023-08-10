import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { CommentInfo } from '../types/custom';

const addComment = async (item: any): Promise<CommentInfo | any> => {
	return await prisma.comment.create({ data: item });
};

const commentExists = async (momentId: string, comment: string, userId: string): Promise<CommentInfo | any> => {
	return await prisma.comment.findFirst({ 
		where: {
			momentId,
			userId,
			comment
		}
	});

};

const getAll = async (momentId: string): Promise<CommentInfo|any> => {
	return await prisma.comment.findMany({
		where: { momentId }
	});
};

export {
	addComment,
	commentExists,
	getAll
};