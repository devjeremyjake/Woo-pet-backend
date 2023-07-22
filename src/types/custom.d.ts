import { User } from '@prisma/client';
import { Request } from 'express';

export interface UserInfo extends User {}

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}
