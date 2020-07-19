import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Platform, UIManager} from 'react-native';

import {GlobalContextProvider} from './src/contexts/global';

import Routes from './src/routes';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
