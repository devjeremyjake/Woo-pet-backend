import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { CategoryInfo } from '../types/custom';

export interface CategoryUpdateInput extends Prisma.CategoryUpdateInput {}

const createCategory = async (item: any): Promise<CategoryInfo> => {
	return await prisma.category.create({ data: item });
};

const fetchCategories = async () => {
	return await prisma.category.findMany({
		include: {
			services: true,
		},
	});
};

const fetchExistingCategory = async (name: string) => {
	return await prisma.category.findFirst({
		where: {
			name,
		},
	});
};

const getCategoryById = async (id: string) => {
	return await prisma.category.findFirst({ where: { id } });
};

const updateCategory = async (
	id: string,
	data: CategoryUpdateInput
): Promise<CategoryInfo> => {
	return await prisma.category.update({ where: { id }, data });
};

const deleteCategory = async(id: string) => {
	return await prisma.category.delete({ where: { id } });
};

export {
	createCategory,
	fetchCategories,
	fetchExistingCategory,
	getCategoryById,
	updateCategory,
	deleteCategory
};