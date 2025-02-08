export const getWsUrl = (): string =>
  (import.meta as any).env?.VITE_WS_URL || '';

export const getApiUrlBackend = (): string =>
  (import.meta as any).env?.VITE_API_URL_BACKEND || '';

export const getClientId = (): string =>
  (import.meta as any).env?.VITE_CLIENT_ID || '';