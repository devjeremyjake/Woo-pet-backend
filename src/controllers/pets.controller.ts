import { Request, Response } from 'express';
import prisma from '../config/database';
import { createPets, fetchExistingPet, fetchPets, destroy, findPetById } from '../models/pets.model';
import { cloudinary } from '../../middleware/cloudinary';

const store = async (req: Request, res: Response) => {
	const {
		name,
		badBehaviour,
		goodBehaviour,
		vaccinations,
		gender,
		weight,
		age,
	} = req.body;
	const imageKey = req.file?.filename;
	const imageUrl = req.file?.path;

	const userId = req.userId;
	try {
		const data = {
			userId,
			name,
			imageKey,
			imageUrl,
			badBehaviour,
			goodBehaviour,
			vaccinations,
			gender,
			weight,
			age
		};
		const fetchExisting = await fetchExistingPet(userId, name);
		if (fetchExisting) return res.status(203).json({ message: 'Pet with the same name already exists for this user' });
		
		const newPet = await createPets(data);

		return res.status(201).json({ message: 'Pet added Successfully', data: newPet });
	} catch (error: any) {
		return res.status(500).json({ message: 'Something went wrong', error: error.message });
	}
};

const fetchUserPets = async (req: Request, res: Response) => {
	const userId = req.userId;
	try {
		const pets = await fetchPets(userId);
		res.status(200).json({ data: pets });
	} catch (error: any) {
		res.status(500).json({ message: 'Something went wrong', error: error.message });
	}
};

const showPet = async (req: Request, res: Response) => {
	const petId = req.params.id;

	try {
		// Find pet by id
		const pet = await findPetById(petId);

		return res.status(200).json({ data: pet });
	} catch (error: any) {
		return res.status(500).json({ message: 'Could not find pet', error: error.message });
	}
};

const deletePet = async (req: Request, res: Response) => {
	const momentId = req.params.id;

	try {
		// Find moment by id
		const moment = await destroy(momentId);
		if (moment) await cloudinary.uploader.destroy(moment.imageKey!, {});
		return res.status(200).json({ message: 'Service has been deleted.' });
	} catch (error: any) {
		return res.status(500).json({ message: 'Could not delete moment', error: error.message });
	}
};

export {
	store,
	fetchUserPets,
	deletePet,
	showPet
};