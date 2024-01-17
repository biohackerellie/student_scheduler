import React from 'react';
import ReactDOM from 'react-dom/client';
import { auth } from './lib/auth.tsx';

import { RouterProvider, Router, ErrorComponent } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen.ts';
import { MsalProvider } from '@azure/msal-react';
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
  IPublicClientApplication,
} from '@azure/msal-browser';
import { msalConfig } from './lib/msal.ts';
import './index.css';
import { Spinner } from './components/Spinner.tsx';

export const queryClient = new QueryClient();
export const msalInstance = new PublicClientApplication(msalConfig);

const router = new Router({
  routeTree,
  defaultPendingComponent: () => (
    <div className="p-2 text-2xl">
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: auth,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  msalInstance.initialize().then(() => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }

    msalInstance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);
      }
    });

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App pca={msalInstance} />
        </QueryClientProvider>
      </React.StrictMode>
    );
  });
}

type AppProps = {
  pca: IPublicClientApplication;
};

export default function App({ pca }: AppProps) {
  return (
    <>
      <MsalProvider instance={pca}>
        <RouterProvider
          router={router}
          defaultPreload="intent"
          context={{ auth }}
        />
      </MsalProvider>
    </>
  );
}
