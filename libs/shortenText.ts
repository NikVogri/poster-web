/**
 * @description shorten text
 * @param text
 * @param maxLen
 * @returns text
 */
export const shortenText = (text: string, maxLen: number): string => {
	if (text.length >= maxLen) return text.substring(0, maxLen) + "...";
	return text;
};
