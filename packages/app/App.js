import React from 'react';

import {GlobalContextProvider} from './src/contexts/global';

import Routes from './src/routes';

export default function App() {
  return (
    <GlobalContextProvider>
      <Routes />
    </GlobalContextProvider>
  );
}
