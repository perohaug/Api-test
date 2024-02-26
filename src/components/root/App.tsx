import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from 'components/contexts/UserContext';
import Main from 'components/root/Main';
import { Router } from '../router/Router';

export const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </HelmetProvider>
  );
};
