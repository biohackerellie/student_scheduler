import oauth2, { azure } from '@bogeychan/elysia-oauth2';
import { randomBytes } from 'crypto';

const globalState = randomBytes(8).toString('hex');
let globalToken = null;

const auth = oauth2({
  profiles: {
    azure: {
      provider: azure({
        tenant: process.env.AZURE_TENANT_ID as string,
      }),
      scope: [],
    },
  },
  state: {
    check(ctx, name, state) {
      return state === globalState;
    },
    generate(ctx, name) {
      return globalState;
    },
  },
  storage: {
    get(ctx, name) {
      return globalToken;
    },
    set(ctx, name, token) {
      globalToken = token;
    },
    delete(ctx, name) {
      globalToken = null;
    },
  },
});

f;
