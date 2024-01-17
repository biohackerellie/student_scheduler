import { FileRoute, Link, redirect } from '@tanstack/react-router';
import StudentIndex from './student.component';

export const Route = new FileRoute('/student').createRoute({
  beforeLoad: ({ context }) => {
    if (context.auth.status === 'unauthenticated') {
      throw redirect({
        to: '/login',
      });
    } else if (context.auth.status === 'authenticated') {
      if (!context.auth.roles[0].includes('student')) {
        throw Error('You are not authorized to access this page');
      }
    }
    return (
      context.auth.status === 'authenticated' &&
      context.auth.roles[0].includes('student')
    );
  },
  component: StudentIndex,
});
