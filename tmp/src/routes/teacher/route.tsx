import { FileRoute, Link, redirect } from '@tanstack/react-router';
import TeacherIndex from './teacher.component';

export const Route = new FileRoute('/teacher').createRoute({
  beforeLoad: ({ context }) => {
    if (context.auth.status === 'unauthenticated') {
      throw redirect({
        to: '/login',
      });
    } else if (context.auth.status === 'authenticated') {
      if (!context.auth.roles[0].includes('teacher')) {
        throw Error('You are not authorized to access this page');
      }
    }
  },
  component: TeacherIndex,
});
