import * as React from 'react';
import { FileRoute, useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useMsal, useAccount } from '@azure/msal-react';
import { loginRequest } from '@/lib/msal';
import { msalInstance } from '@/main.tsx';

export const Route = new FileRoute('/login')
  .createRoute({
    validateSearch: z.object({
      redirect: z.string().optional(),
    }),
  })
  .update({
    component: LoginComponent,
  });

function LoginComponent() {
  const router = useRouter();
  const { auth } = Route.useRouteContext();
  const search = Route.useSearch();
  const { instance, accounts } = useMsal();
  const account = msalInstance.getActiveAccount();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });

    auth.status = 'authenticated';
    auth.user = account?.username;
    console.log('account: ', account);
    router.invalidate();
  };
  React.useLayoutEffect(() => {
    if (auth.status === 'authenticated') {
      router.history.push(search.redirect ?? '/');
    }
  }, [auth.status, search.redirect]);

  return auth.status === 'authenticated' ? (
    <div>
      Logged in as {auth.user}
      <div>
        <Button
          onClick={() => {
            auth.status = 'unauthenticated';
            auth.user = undefined;
            msalInstance.logout();
            router.invalidate();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  ) : (
    <div className="p-2">
      <div>you must login</div>
      <div />

      <Button onClick={() => handleLogin()}>Login</Button>
    </div>
  );
}
