import * as React from 'react';
import { Link, Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Auth } from '@/lib/auth';

export const Route = rootRouteWithContext<{
  auth: Auth;
  queryClient: QueryClient;
}>()({
  component: App,
});

function App() {
  return (
    <>
      <main className="h-full w-auto">
        <h1>App</h1>
      </main>
      <hr />
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
