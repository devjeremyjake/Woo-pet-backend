import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { ServiceInfo } from '../types/custom';

export interface ServiceUpdateInput extends Prisma.ServiceUpdateInput {}

export const createService = async (item: any): Promise<ServiceInfo> => {
	return await prisma.service.create({ data: item });
};

export const findServicesById = async (
	id: string
): Promise<ServiceInfo | any> => {
	return await prisma.service.findMany({
		where: { id },
		include: { category: true, orders: true, reviews: true },
	});
};

export const updateUser = async (
	id: string,
	data: ServiceUpdateInput
): Promise<ServiceInfo> => {
	return await prisma.service.update({ where: { id }, data });
};
