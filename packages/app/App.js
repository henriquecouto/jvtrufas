import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';

const {Navigator, Screen} = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}
