import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {GlobalContextProvider} from './src/contexts/global';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const {Navigator, Screen} = createStackNavigator();

export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Navigator headerMode="none" initialRouteName="Login">
          <Screen name="Login" component={Login} />
          <Screen name="Home" component={Home} />
        </Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
