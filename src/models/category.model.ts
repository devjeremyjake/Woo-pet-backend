import prisma from '../config/database';
import { CategoryInfo } from '../types/custom';

export const createCategory = async (item: any): Promise<CategoryInfo> => {
	return await prisma.category.create({ data: item });
};

export const fetchCategories = async () => {
	return await prisma.category.findMany({
		include: {
			services: true,
		},
	});
};

export const fetchExisitingCategory = async (name: string) => {
	return await prisma.category.findFirst({
		where: {
			name,
		},
	});
};
