import { User, Pets } from '@prisma/client';
import { Request } from 'express';

export interface UserInfo extends User {}
export interface PetsInfo extends Pets {}

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}
