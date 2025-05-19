export function handleError(error: any, fallbackMessage: string): never {
    throw new Error(fallbackMessage + ": " + (error.response?.data?.message || error.message));
}