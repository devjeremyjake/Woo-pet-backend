import { UserInfo } from '../types/custom';

export const verifyOtpValidity = (user: UserInfo, otp: string): boolean => {
	const currentTime = new Date().getTime();
	const isOtpValid =
		user.otp === otp &&
		user.otpExpiration &&
		user.otpExpiration.getTime() > currentTime;
	return isOtpValid;
};
