import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import {
	createService,
	findServicesById,
	updateUser,
} from '../models/service.model';

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: (req, file) => {
		return {
			folder: 'woopets', // Replace with the desired folder name in Cloudinary
		};
	},
});

export const addnewService = async (req: Request, res: Response) => {
	const upload = multer({ storage: cloudinaryStorage }).single('imageUrl');
	const {
		userId,
		categoryId,
		price,
		description,
		providerLatitude,
		providerLongitude,
		imageUrl,
	} = req.body;
	const file = req.file;

	try {
		// Call the multer middleware here to upload the image
		upload(req, res, async (error: any) => {
			if (error) {
				return res
					.status(500)
					.json({ message: 'Could not add service', error });
			}

			// Access the image URL from the multer file object
			// const imageUrl = req.file?.path;
			console.log('Data', res);

			// Create the service with the updated imageUrl
			// const response = await createService({
			// 	userId,
			// 	categoryId,
			// 	price,
			// 	description,
			// 	providerLatitude,
			// 	providerLongitude,
			// 	imageUrl: imageUrl,
			// });

			// console.log('Response', response);
			// return res.status(200).json({ message: 'Service added successfully', data: response });
		});
	} catch (error) {
		return res.status(500).json({ message: 'Could not add service', error });
	}
};

// timeFlightRemains(timestamp) {
// let countDownToDate = parseInt(timestamp);
// let now = Date.now();
// let distance = countDownToDate - now;

// const second = 1000,
//   minute = second * 60,
//   hour = minute * 60,
//   day = hour * 24;

// if (distance < 1) {
//   return false;
// } else {
//   if (Math.floor(distance / hour) < 1) {
//     return `${Math.floor((distance % (hour)) / (minute))} ${Math.floor((distance % (hour)) / (minute)) < 2 ? 'minute' : 'minutes'} time`;
