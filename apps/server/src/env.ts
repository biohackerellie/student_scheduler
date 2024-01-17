import { object, coerce, string } from 'zod';

const EnvSchema = object({
  PORT: coerce.number().default(3030),
  HOST: string().default('localhost'),
  CLIENT_HOST: string().default('http://localhost:5173'),
  DATABASE_URL: string(),
});

export const env = EnvSchema.parse(process.env);
