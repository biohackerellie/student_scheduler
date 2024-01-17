import { UserRole } from 'db/types';

export type Auth = {
  status: 'unauthenticated' | 'authenticated';
  user: string | undefined;
  roles: UserRole[] | ['student'];
  login: (username: string, roles?: UserRole[]) => void;
  logout: () => void;
};

export const auth: Auth = {
  status: 'unauthenticated',
  user: undefined,
  roles: ['student'],
  login: (username: string, roles?: UserRole[]) => {
    auth.status = 'authenticated';
    auth.user = username;
    auth.roles = roles ?? ['student'];
  },
  logout: () => {
    auth.status = 'unauthenticated';
    auth.user = undefined;
  },
};
