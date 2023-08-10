import { Request, Response } from 'express';
import { cloudinary } from '../../middleware/cloudinary';

import {
	createService,
	findServiceById,
	updateUser,
	destroy
} from '../models/service.model';

const storeService = async (req: Request, res: Response) => {
	const {
		categoryId,
		price,
		experience,
		description,
		lat,
		lng
	} = req.body;
	const userId = req.userId;
	console.log(req.file);
	const fileKey = req.file?.filename;
	const fileUrl = req.file?.path;

	try {
		// Create the service with the updated imageUrl
		const response = await createService({
			userId,
			categoryId,
			price: parseFloat(price),
			experience,
			description,
			lat: parseFloat(lat),
			lng: parseFloat(lng),
			fileKey,
			fileUrl
		});

		return res.status(201).json({ message: 'Service added successfully', data: response });
	} catch (error) {
		await cloudinary.uploader.destroy(fileKey!);
		return res.status(500).json({ message: 'Could not add service', error });
	}
};

const showService = async (req: Request, res: Response) => {
	const serviceId = req.params.id;

	try {
		// Find service by id
		const service = await findServiceById(serviceId);

		return res.status(200).json({ data: service });
	} catch (error) {
		return res.status(500).json({ message: 'Could not find service', error });
	}
};

const deleteService = async (req: Request, res: Response) => {
	const serviceId = req.params.id;

	try {
		// Find service by id
		const service = await destroy(serviceId);
		// console.log(service);
		if (service) await cloudinary.uploader.destroy(service.fileKey!);
		// await cloudinary.uploader.destroy('woopet/syc3c5gypcpeszgybv2n.jpg');

		return res.status(200).json({ message: 'Service has been deleted.' });
	} catch (error) {
		return res.status(500).json({ message: 'Could not delete service', error });
	}
};

export {
	storeService,
	showService,
	deleteService
};