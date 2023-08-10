import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { ServiceInfo } from '../types/custom';

interface ServiceUpdateInput extends Prisma.ServiceUpdateInput {}

const createService = async (item: any): Promise<ServiceInfo> => {
	return await prisma.service.create({ data: item });
};

const findServiceById = async (
	id: string
): Promise<ServiceInfo | any> => {
	return await prisma.service.findFirst({
		where: { id },
		include: {
			category: true, 
			orders: true, 
			reviews: true,
			provider: true
		},
	});
};

const updateUser = async (
	id: string,
	data: ServiceUpdateInput
): Promise<ServiceInfo> => {
	return await prisma.service.update({ where: { id }, data });
};

const destroy = async (id: string): Promise<ServiceInfo> => {
	return await prisma.service.delete({
		where: { id },
		include: {
			orders: true, 
			reviews: true
		},
	});
};

export {
	ServiceUpdateInput,
	createService,
	findServiceById,
	updateUser,
	destroy
};