import { FileRoute, Link, redirect } from '@tanstack/react-router';
import SecretaryIndex from './secretary.component';

export const Route = new FileRoute('/secretary').createRoute({
  beforeLoad: ({ context }) => {
    if (context.auth.status === 'unauthenticated') {
      throw redirect({
        to: '/login',
      });
    } else if (context.auth.status === 'authenticated') {
      if (!context.auth.roles[0].includes('secretary')) {
        throw Error('You are not authorized to access this page');
      }
    }
  },
  component: SecretaryIndex,
});
