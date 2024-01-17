import { env } from '@/env';

const runtime = import.meta.env.MODE;

export const msalConfig = {
  auth: {
    clientId: env.VITE_AZURE_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${env.VITE_AZURE_AD_TENANT_ID}`,
    redirectUri:
      runtime === 'development'
        ? `${env.VITE_HOST}:${env.VITE_PORT}`
        : `${env.VITE_HOST}`,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};
