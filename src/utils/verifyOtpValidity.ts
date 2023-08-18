import { UserInfo } from '../types/custom';

export const verifyOtpValidity = (user: UserInfo, otp: string): boolean => {
	const currentTime = new Date();
	const isOtpValid = user.otp === otp;
	return isOtpValid;
};
