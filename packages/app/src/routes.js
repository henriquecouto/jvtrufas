import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import ShopHome from './screens/ShopHome';
import ShopItem from './screens/ShopItem';
import ShopCart from './screens/ShopCart';
import {GlobalContext} from './contexts/global';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Shop = createStackNavigator();

function BottomTabRoutes() {
  // const [{cart}] = useContext(GlobalContext);
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
      {/* {cart.items && (
        <BottomTab.Screen
          name="ShopCart"
          component={ShopCart}
          options={{
            tabBarIcon: () => (
              <Icon name="shopping-cart" size={30} color="#fff" />
            ),
          }}
        />
      )} */}
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

function ShopRoutes() {
  return (
    <Shop.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'FredokaOne-Regular',
        },
        headerTintColor: '#5c2f0c',
      }}>
      <Shop.Screen
        name="ShopHome"
        component={ShopHome}
        options={{
          title: 'Fazer Encomenda',
        }}
      />
      <Shop.Screen name="ShopItem" component={ShopItem} />
    </Shop.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={'Home'}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={BottomTabRoutes} />
        <Stack.Screen name="Shop" component={ShopRoutes} />
        <Stack.Screen name="ShopCart" component={ShopCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
