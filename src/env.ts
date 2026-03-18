export function isDev(): boolean { return import.meta.env.DEV; }
export function isProd(): boolean { return import.meta.env.PROD; }
export function getBaseUrl(): string { return import.meta.env.BASE_URL; }
export function getMode(): string { return import.meta.env.MODE; }
