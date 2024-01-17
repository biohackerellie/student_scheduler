import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DIRECT_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),

    AZURE_AD_CLIENT_SECRET: z.string().min(1),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_API_URL: z.string().url(),
    VITE_API_PORT: z.string(),
    VITE_HOST: z.string().url(),
    VITE_PORT: z.string(),
    VITE_NEXTAUTH_URL: z.string().url(),
    VITE_REDIS_IP: z.string().ip(),
    VITE_REDIS_PORT: z.string(),
    VITE_AZURE_AD_TENANT_ID: z.string().min(1),
    VITE_AZURE_AD_CLIENT_ID: z.string().min(1),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});

// DIRECT_URL: process.env.DIRECT_URL,
// DATABASE_URL: process.env.DATABASE_URL,
// PUBLIC_HOST: process.env.PUBLIC_HOST,
// PUBLIC_API_PORT: process.env.PUBLIC_API_PORT,
// PUBLIC_API_URL: process.env.PUBLIC_API_URL,
// PUBLIC_PORT: process.env.PUBLIC_PORT,
// NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
// PUBLIC_NEXTAUTH_URL: process.env.PUBLIC_NEXTAUTH_URL,
// AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
// AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
// AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
// PUBLIC_REDIS_HOST: process.env.PUBLIC_REDIS_HOST,
// PUBLIC_REDIS_PORT: process.env.PUBLIC_REDIS_PORT,
