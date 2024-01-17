import * as React from 'react';
import { FileRoute, Link, redirect } from '@tanstack/react-router';
import { auth } from '../lib/auth.tsx';

export const Route = new FileRoute('/_auth').createRoute({
  beforeLoad: ({ context, location }) => {
    if (context.auth.status === 'unauthenticated') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
    return {
      user: auth.user,
    };
  },
});
