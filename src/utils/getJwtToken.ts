import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'jwtTokenSecret';

const getJwtToken = (userId: string) => {
	return jwt.sign({ userId }, jwtSecret, { expiresIn: '1hr' });
};

export default getJwtToken;
