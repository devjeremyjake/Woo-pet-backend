import { Request, Response } from 'express';
import { cloudinary } from '../../middleware/cloudinary';

import {
	createService,
	findServicesById,
	updateUser,
} from '../models/service.model';

const store = async (req: Request, res: Response) => {
	const {
		userId,
		categoryId,
		price,
		experience,
		description,
		lat,
		lng
	} = req.body;

	const fileKey = req.file?.filename;
	const fileUrl = req.file?.path;

	try {
		// Create the service with the updated imageUrl
		const response = await createService({
			userId,
			categoryId,
			price,
			experience,
			description,
			lat,
			lng,
			fileKey,
			fileUrl
		});

		return res.status(201).json({ message: 'Service added successfully', data: response });
	} catch (error) {
		await cloudinary.uploader.destroy(fileKey!);
		return res.status(500).json({ message: 'Could not add service', error });
	}
};

export {
	store,
};