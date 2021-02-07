/**
 * Checks if the current code is running on server or client
 */
export const isServer = () => typeof window === "undefined";
