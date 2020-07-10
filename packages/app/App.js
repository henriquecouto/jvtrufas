import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {GlobalContextProvider} from './src/contexts/global';

import Routes from './src/routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GlobalContextProvider>
      <Routes />
    </GlobalContextProvider>
  );
}
