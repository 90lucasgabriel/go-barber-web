import React from 'react';

import { AuthProvider } from './hooks/AuthContext';

import ToastContainer from './components/ToastContainer';

import GlobalStyle from './styles/global';
import Signin from './pages/Sigin';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Signin />
    </AuthProvider>

    <ToastContainer />

    <GlobalStyle />
  </>
);

export default App;
