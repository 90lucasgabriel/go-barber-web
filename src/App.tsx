import React from 'react';

import GlobalStyle from './styles/global';
import Signin from './pages/Sigin';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{name: 'Lucas'}}>
      <Signin />
    </AuthContext.Provider>

    <GlobalStyle />
  </>
);

export default App;
