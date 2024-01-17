import { CookiesOptions } from '@auth/core/types';

const mode = process.env.NODE_ENV!;

const cookiesConfig: Partial<CookiesOptions> = {
  sessionToken: {
    name:
      mode === 'production'
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: mode === 'production' ? true : false,
    },
  },

  callbackUrl: {
    name:
      mode === 'production'
        ? `__Secure-next-auth.callback-url`
        : `next-auth.callback-url`,
    options: {
      sameSite: mode === 'production' ? 'none' : 'lax',
      path: '/',
      secure: mode === 'production' ? true : false,
    },
  },
  csrfToken: {
    name:
      mode === 'production'
        ? `__Secure-next-auth.csrf-token`
        : `next-auth.csrf-token`,
    options: {
      httpOnly: true,
      sameSite: mode === 'production' ? 'none' : 'lax',
      path: '/',
      secure: mode === 'production' ? true : false,
    },
  },
  pkceCodeVerifier: {
    name:
      mode === 'production'
        ? `__Secure-next-auth.pkce.code_verifier`
        : `next-auth.pkce.code_verifier`,
    options: {
      httpOnly: true,
      sameSite: mode === 'production' ? 'none' : 'lax',
      path: '/',
      secure: mode === 'production' ? true : false,
    },
  },
  state: {
    name:
      mode === 'production' ? `__Secure-next-auth.state` : `next-auth.state`,
    options: {
      httpOnly: true,
      sameSite: mode === 'production' ? 'none' : 'lax',
      path: '/',
      secure: mode === 'production' ? true : false,
    },
  },
};

export default cookiesConfig;
