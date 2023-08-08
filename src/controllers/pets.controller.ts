import { Request, Response } from 'express';
import prisma from '../config/database';
import { createPets, fetchExistingPet, fetchPets } from '../models/pets.model';
export const store = async (req: Request, res: Response) => {
	const {
		imageSrc,
		name,
		badBehavior,
		goodBehavior,
		vaccinations,
		gender,
		weight,
		age,
	} = req.body;
	const userId = req.userId;
	try {
		const data = {
			userId,
			imageSrc,
			name,
			badBehavior,
			goodBehavior,
			vaccinations,
			gender,
			weight,
			age
		};
		const fetchExisting = await fetchExistingPet(userId, name);
		if (fetchExisting) {
			return res
				.status(400)
				.json({ error: 'Pet with the same name already exists for this user' });
		}
		const newPet = await createPets(data);
		res.status(201).json({ message: 'Pet added Successfully', pet: newPet });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export const fetchUserPets = async (req: Request, res: Response) => {
	const userId = req.userId;
	try {
		const pets = await fetchPets(userId);
		res.status(201).json({ error: false, pets });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' });
	}
};
