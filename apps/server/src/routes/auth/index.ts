import { Context, Elysia, t } from 'elysia';
import { Auth } from '@auth/core';
import { authConfig } from '@/lib/auth/config';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .get('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  })
  .post('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  });
