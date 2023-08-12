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
			error: false,
			data: response,
			message: 'Category added successfully',
		});
	} catch (error) {
		res.status(500).json({ error: 'Could not add category' });
	}
};

const getAll = async (req: Request, res: Response) => {
	try {
		const response = await fetchCategories();
		res.status(200).json({ error: false, data: response });
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch categories' });
	}
};

const edit = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		const response = await getCategoryById(id);
		res.status(200).json({ error: false, data: response });
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch categories' });
	}
};

const update = async (req: Request, res:Response) => {
	const id = req.params.id;
	const { name, description } = req.body;

	try {
		const fetchExisting = await fetchExistingCategory(name);
		if (fetchExisting && fetchExisting.id != id) return res.status(203).json({
			error: true,
			message: 'Category with the same name already exists',
		});

		const slug = slugify(name);
		const response = await updateCategory(id, { name, description, slug });
		return res.status(202).json({
			error: false,
			data: response,
			message: 'Category updated successfully',
		});
	} catch (error) {
		return res.status(500).json({ error: 'Could not update category' });
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		const response = await deleteCategory(id);
		res.status(200).json({ error: false, data: response });
	} catch (error) {
		res.status(500).json({ error: 'Could not delete category' });
	}
};

export {
	getAll,
	store,
	edit,
	update,
	destroy
};