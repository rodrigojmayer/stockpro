export const getWsUrl = (): string => process.env.VITE_WS_URL || '';

export const getApiUrlBackend = (): string =>
  process.env.VITE_API_URL_BACKEND || '';

export const getClientId = (): string => process.env.VITE_CLIENT_ID || '';