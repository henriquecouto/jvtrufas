import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from './screens/Home';
import SignIn from './screens/SignIn';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

function BottomTabRoutes() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        labelStyle: {display: 'none'},
        style: {backgroundColor: '#5c2f0c'},
        activeBackgroundColor: '#0004',
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Icon name="home" size={30} color="#fff" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Icon name="user" size={30} color="#fff" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={'Home'}>
        <Stack.Screen name="SignIn" component={SignIn} />
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
        <Stack.Screen name="Home" component={BottomTabRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
