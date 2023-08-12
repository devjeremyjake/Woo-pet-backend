import { Request, Response } from 'express';
import { cloudinary } from '../../middleware/cloudinary';
import { paginate, pagination } from '../utils/helper';

import {
	createService,
	findServiceById,
	getAllUserServices,
	updateUser,
	destroy,
	servicesNearYou,
	suggestedServices
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

const servicesByUser = async (req: Request, res: Response) => {
	const userId = req.userId;

	try {
		// Find all user's services
		const services = await getAllUserServices(userId);

		return res.status(200).json({ data: services });
	} catch (error) {
		return res.status(500).json({ message: 'Could not find service', error });
	}
};

const deleteService = async (req: Request, res: Response) => {
	const serviceId = req.params.id;

	try {
		// Find service by id
		const service = await destroy(serviceId);
		if (service) await cloudinary.uploader.destroy(service.fileKey!, {});
		return res.status(200).json({ message: 'Service has been deleted.' });
	} catch (error) {
		return res.status(500).json({ message: 'Could not delete service', error });
	}
};

const fetchServicesNearYou = async (req: Request, res: Response) => {
	const { page, page_size, lat, lng, distance } : any = req.query;
	const p: number = typeof page === 'string' ? parseInt(page) : page;
	const pageSize: number = typeof page_size === 'string' ? parseInt(page_size) : page_size;
	const latitude: number = typeof lat === 'string' ? parseFloat(lat) : lat;
	const longitude: number = typeof lng === 'string' ? parseFloat(lng) : lng;
	const distanceInKim: number = typeof distance === 'string' ? parseFloat(distance) : distance;

	const paginateData = paginate(p, pageSize);

	try {
		// Find all user's services
		const services = await servicesNearYou(latitude, longitude, paginateData.offset, paginateData.limit, p, pageSize, distanceInKim);

		return res.status(200).json({ data: services });
	} catch (error) {
		return res.status(500).json({ message: 'Could not find service', error });
	}
};

const suggestedServicesForUser = async (req: Request, res: Response) => {
	const { page, page_size, category } : any = req.query;
	const p: number = typeof page === 'string' ? parseInt(page) : page;
	const pageSize: number = typeof page_size === 'string' ? parseInt(page_size) : page_size;

	const paginateData = paginate(p, pageSize);

	try {
		// Suggested services for user
		const services = await suggestedServices(category, paginateData.offset, paginateData.limit, p, pageSize);

		return res.status(200).json({ data: services });
	} catch (error) {
		return res.status(500).json({ message: 'Could not find service', error });
	}
};

export {
	storeService,
	showService,
	servicesByUser,
	deleteService,
	fetchServicesNearYou,
	suggestedServicesForUser
};