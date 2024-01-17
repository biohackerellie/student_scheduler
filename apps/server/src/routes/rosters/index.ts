import { Elysia, t } from 'elysia';
import { getRosters, getRostersById, getStudentRoster } from './handlers';

export const rosterRoutes = new Elysia({ prefix: '/rosters' })
  .get('/', () => getRosters())
  .get('/:id', ({ params: { id } }) => getRostersById(id), {
    params: t.Object({
      id: t.String(),
    }),
  })
  .get('/student/:email', ({ params: { email } }) => getStudentRoster(email), {
    params: t.Object({
      email: t.String(),
    }),
  });
