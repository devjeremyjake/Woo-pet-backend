import prisma from '../config/database';
import { PetsInfo } from '../types/custom';

const createPets = async (pet: any): Promise<PetsInfo> => {
	return await prisma.pets.create({ data: pet });
};

const fetchPets = async (id: string) => {
	return await prisma.pets.findMany({
		where: {
			userId: id,
		},
	});
};

const fetchExistingPet = async (id: string, name: string) => {
	return await prisma.pets.findFirst({
		where: {
			userId: id,
			name,
		},
	});
};

const destroy = async (id: string): Promise<PetsInfo> => {
	return await prisma.pets.delete({
		where: { id }
	});
};

export {
	createPets,
	fetchPets,
	fetchExistingPet,
	destroy
};