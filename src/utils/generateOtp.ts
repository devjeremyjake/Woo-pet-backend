export const generateOtp = (): string => {
	const generatedValue = Math.floor(1000 + Math.random() * 900000);
	return `${generatedValue}`;
};
