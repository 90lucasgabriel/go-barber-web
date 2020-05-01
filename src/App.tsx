import React from 'react';

import AppProvider from './hooks';

import GlobalStyle from './styles/global';
import Signin from './pages/Sigin';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Signin />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
