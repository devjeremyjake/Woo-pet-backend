import { Request, Response } from 'express';
import {
	createCategory,
	fetchCategories,
	fetchExisitingCategory,
} from '../models/category.model';

export const addnewCategory = async (req: Request, res: Response) => {
	const { name, description } = req.body;
	try {
		const fetchExisiting = await fetchExisitingCategory(name);
		if (fetchExisiting) {
			return res.status(409).json({
				error: true,
				message: 'Category with the same name already exists',
			});
		}
		const response = await createCategory({ name, description });
		res.status(201).json({
			error: false,
			data: response,
			message: 'Category added successfully',
		});
	} catch (error) {
		res.status(500).json({ error: 'Could not add category' });
	}
};

export const getAllCategory = async (req: Request, res: Response) => {
	try {
		const response = await fetchCategories();
		res.status(200).json({ error: false, data: response });
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch categories' });
	}
};
