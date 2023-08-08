import { User, Pets, Category, Service } from '@prisma/client';
import { Request } from 'express';

export interface UserInfo extends User {}
export interface PetsInfo extends Pets {}
export interface CategoryInfo extends Category {}
export interface ServiceInfo extends Service {}

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}
