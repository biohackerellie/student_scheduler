import * as React from 'react';
import { FileRoute, useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useMsal, useAccount } from '@azure/msal-react';

export const Route = new FileRoute('/login')
  .createRoute({
    validateSearch: z.object({
      redirect: z.string().optional(),
    }),
  })
  .update({
    component: LoginComponent,
  });

const LoginButton = () => {
  const router = useRouter();
  const { auth } = Route.useRouteContext();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const handleLogin = () => {
    instance.loginPopup().catch((e) => {
      console.error(e);
    });
    auth.status = 'authenticated';
    auth.user = account;
    router.invalidate();
  };

  return <Button onClick={handleLogin}>Login</Button>;
};

function LoginComponent() {
  const router = useRouter();
  const { auth } = Route.useRouteContext();
  const search = Route.useSearch();

  React.useLayoutEffect(() => {
    if (auth.status === 'authenticated') {
      router.history.push(search.redirect ?? '/');
    }
  }, [auth.status, search.redirect]);

  return auth.status === 'authenticated' ? (
    <div>
      Logged in as {auth.user.name}
      <div>
        <Button
          onClick={() => {
            auth.status = 'unauthenticated';
            auth.user = undefined;

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

      <LoginButton />
    </div>
  );
}
