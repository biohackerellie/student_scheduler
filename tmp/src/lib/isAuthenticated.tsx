import { useIsAuthenticated, useMsal } from '@azure/msal-react';

export const AuthCheck = () => {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) return true;
  else return false;
};
