declare module '@auth/core/types' {
  interface User {
    role?: string;
  }

  interface Account {}

  interface Session {}
}

import { JWT } from '@auth/core/jwt';

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: string;
  }
}
