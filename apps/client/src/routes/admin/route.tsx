import { FileRoute, Link, redirect } from '@tanstack/react-router';
import AdminIndex from './admin.component';

export const Route = new FileRoute('/admin').createRoute({
  beforeLoad: ({ context }) => {
    if (context.auth.status === 'unauthenticated') {
      throw redirect({
        to: '/login',
      });
    } else if (context.auth.status === 'authenticated') {
      if (!context.auth.roles[0].includes('admin')) {
        throw Error('You are not authorized to access this page');
      }
    }
  },
  component: AdminIndex,
});
