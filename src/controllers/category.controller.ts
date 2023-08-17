import { Request, Response } from 'express';
import {
	createCategory,
	fetchCategories,
	fetchExistingCategory,
	getCategoryById,
	updateCategory,
	deleteCategory
} from '../models/category.model';
import slugify from 'slugify';

const store = async (req: Request, res: Response) => {
	const { name, description } = req.body;
	try {
		const fetchExisting = await fetchExistingCategory(name);
		if (fetchExisting) return res.status(203).json({
			error: true,
			message: 'Category with the same name already exists',
		});

		const slug = slugify(name);
		const response = await createCategory({ name, description, slug });
		res.status(201).json({
			data: response,
			message: 'Category added successfully',
		});
	} catch (error: any) {
		res.status(500).json({ message: 'Could not add category', error: error.message });
	}
};

const getAll = async (req: Request, res: Response) => {
	try {
		const response = await fetchCategories();
		res.status(200).json({ error: false, data: response });
	} catch (error: any) {
		res.status(500).json({ message: 'Could not fetch categories', error: error.message });
	}
};

const edit = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		const response = await getCategoryById(id);
		res.status(200).json({ data: response });
	} catch (error: any) {
		res.status(500).json({ message: 'Could not fetch categories', error: error.message });
	}
};

const update = async (req: Request, res:Response) => {
	const id = req.params.id;
	const { name, description } = req.body;

	try {
		const fetchExisting = await fetchExistingCategory(name);
		if (fetchExisting && fetchExisting.id != id) return res.status(203).json({
			message: 'Category with the same name already exists',
		});

		const slug = slugify(name);
		const response = await updateCategory(id, { name, description, slug });
		return res.status(202).json({
			data: response,
			message: 'Category updated successfully',
		});
	} catch (error: any) {
		return res.status(500).json({ message: 'Could not update category', error: error.message });
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		const response = await deleteCategory(id);
		res.status(200).json({ data: response });
	} catch (error: any) {
		res.status(500).json({ message: 'Could not delete category', error: error.message });
	}
};

export {
	getAll,
	store,
	edit,
	update,
	destroy
};