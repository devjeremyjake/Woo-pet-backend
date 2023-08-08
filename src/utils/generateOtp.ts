export const generateOtp = (): string => {
	const generatedValue = Math.floor(1000 + Math.random() * 9000);
	return `${generatedValue}`;
};
