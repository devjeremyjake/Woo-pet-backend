import { Request, Response } from 'express';
import { cloudinary } from '../../middleware/cloudinary';

import {
	createMoment,
	getAllUserMoments,
	destroy
} from '../models/moment.model';

const store = async (req: Request, res: Response) => {
	const userId = req.userId;
	const imageKey = req.file?.filename;
	const imageUrl = req.file?.path;

	try {
		// Create the moment with the updated imageUrl
		const response = await createMoment({
			userId,
			imageKey,
			imageUrl
		});

		return res.status(201).json({ message: 'Moment added successfully', data: response });
	} catch (error) {
		await cloudinary.uploader.destroy(imageKey!);
		return res.status(500).json({ message: 'Could not create moment', error });
	}
};

const momentsByUser = async (req: Request, res: Response) => {
	const userId = req.userId;

	try {
		// Find all user's moments
		const moments = await getAllUserMoments(userId);

		return res.status(200).json({ data: moments });
	} catch (error) {
		return res.status(500).json({ message: 'Could not find moment', error });
	}
};

const deleteMoment = async (req: Request, res: Response) => {
	const momentId = req.params.id;

	try {
		// Find moment by id
		const moment = await destroy(momentId);
		if (moment) await cloudinary.uploader.destroy(moment.imageKey!, {});
		return res.status(200).json({ message: 'Service has been deleted.' });
	} catch (error) {
		return res.status(500).json({ message: 'Could not delete moment', error });
	}
};

export {
	store,
	momentsByUser,
	deleteMoment,
};