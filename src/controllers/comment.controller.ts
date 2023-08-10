import { Request, Response } from 'express';

import {
	addComment,
	commentExists,
	getAll
} from '../models/comment.model';

const store = async (req: Request, res: Response) => {
	const { comment, userId, momentId } = req.body;

	try {
		const commentAlreadyExists = await commentExists(momentId, comment.comment, userId);
		if (commentAlreadyExists) return res.status(203).json({ message: 'Comment already exists!'});

		// Add comment to moment
		const response = await addComment({
			userId,
			momentId,
			comment
		});

		return res.status(201).json({ message: 'Comment added successfully', data: response });
	} catch (error) {
		return res.status(500).json({ message: 'Could not add comment to moment', error });
	}
};

const getAllMomentComments = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const comments = await getAll(id);

		return res.status(200).json({ data: comments });
	} catch (error) {
		return res.status(500).json({ message: 'Could not fetch moment\'s comments', error });
	}
};

export {
	store,
	getAllMomentComments
};