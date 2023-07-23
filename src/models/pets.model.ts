import prisma from '../config/database';
import { PetsInfo } from '../types/custom';

export const createPets = async (pet: any): Promise<PetsInfo> => {
	return await prisma.pets.create({ data: pet });
};

export const fetchPets = async (id: string) => {
	return await prisma.pets.findMany({
		where: {
			userId: id,
		},
	});
};

export const fetchExisitngPet = async (id: string, name: string) => {
	return await prisma.pets.findFirst({
		where: {
			userId: id,
			name,
		},
	});
};
