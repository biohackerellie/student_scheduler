import { useMsal } from '@azure/msal-react';

export type Auth = {
  status: 'unauthenticated' | 'authenticated';
  user: any;
};

export const auth: Auth = {
  status: 'unauthenticated',
  user: undefined,
};
