import { User, Pets, Category, Service, Moment } from '@prisma/client';
import { Request } from 'express';

export interface UserInfo extends User {}
export interface PetsInfo extends Pets {}
export interface CategoryInfo extends Category {}
export interface ServiceInfo extends Service {}
export interface MomentInfo extends Moment {}
export interface CommentInfo extends Comment {}

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}
