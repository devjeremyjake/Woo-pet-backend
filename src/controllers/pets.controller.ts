import { Request, Response } from 'express';
import { createPets, fetchExisitngPet, fetchPets } from '../models/pets.model';
export const addNewPet = async (req: Request, res: Response) => {
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
			age,
		};
		const fetchExisiting = await fetchExisitngPet(userId, name);
		if (fetchExisiting) {
			return res
				.status(409)
				.json({
					error: true,
					message: 'Pet with the same name already exists for this user',
				});
		}
		const newPet = await createPets(data);
		res
			.status(201)
			.json({ error: false, message: 'Pet added Successfully', pet: newPet });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export const findUserPets = async (req: Request, res: Response) => {
	const userId = req.userId;
	try {
		const pets = await fetchPets(userId);
		res.status(201).json({ error: false, pets });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' });
	}
};
