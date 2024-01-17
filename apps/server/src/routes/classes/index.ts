import { Elysia, t } from 'elysia';
import { getClasses, getClassById } from './handlers';

export const classRoutes = new Elysia({ prefix: '/classes' })
  .get('/', () => getClasses())
  .get('/:id', ({ params: { id } }) => getClassById(id), {
    params: t.Object({
      id: t.String(),
    }),
  });
