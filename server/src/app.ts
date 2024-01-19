import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { classRoutes } from './routes/classes';
import { rosterRoutes } from './routes/rosters';

import swagger from '@elysiajs/swagger';

const app = new Elysia()
  .use(swagger())
  .use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  )
  .group('/api', (app) => app.use(classRoutes).use(rosterRoutes));

export default app;
