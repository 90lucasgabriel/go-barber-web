import React from 'react';

import GlobalStyle from './styles/global';
import Signin from './pages/Sigin';
import Signup from './pages/Signup';

const App: React.FC = () => (
  <>
    <Signup />
    <GlobalStyle />
  </>
);

export default App;
