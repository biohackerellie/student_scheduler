import { FileRoute, Link, redirect } from '@tanstack/react-router';
import { useIsAuthenticated } from '@azure/msal-react';
import { msalInstance } from '@/main.tsx';
import { UserRole } from 'db/types';
import { AuthCheck } from '@/lib/isAuthenticated.tsx';

export const Route = new FileRoute('/_auth').createRoute({
  beforeLoad: async ({ context, location }) => {
    if (context.auth.status === 'unauthenticated') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    } else if (context.auth.status === 'authenticated') {
      if (context.auth.roles[0].includes('student')) {
        throw redirect({
          to: '/student',
        });
      } else if (context.auth.roles[0].includes('teacher')) {
        throw redirect({
          to: '/teacher',
        });
      } else if (context.auth.roles[0].includes('admin')) {
        throw redirect({
          to: '/admin',
        });
      } else if (context.auth.roles[0].includes('secretary')) {
        throw redirect({
          to: '/secretary',
        });
      }
    }
  },
});
