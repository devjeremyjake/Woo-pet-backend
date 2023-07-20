import getJwtToken from './getJwtToken';
import { UserAuth } from '../types';

const cookieToken = (user: UserAuth, res: any, message: string) => {
	const token = getJwtToken(user.id);
	const options = {
		expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	user.password = undefined;
	res.status(200).cookie('token', token, options).json({
		success: true,
		token,
		user,
		message,
	});
};

export default cookieToken;
