import getJwtToken from './getJwtToken';
import { User } from '@prisma/client';

const cookieToken = (user: User, res: any, message: string) => {
	const token = getJwtToken(user.id);
	const options = {
		expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	res.status(200).cookie('token', token, options).json({
		success: true,
		token,
		message,
	});
};

export default cookieToken;
