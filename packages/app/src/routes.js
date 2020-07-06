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
import CartHome from './screens/CartHome';
import SelectAddress from './screens/SelectAddress';
import AddressesHome from './screens/AddressesHome';
import AddAddress from './screens/AddAddress';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Shop = createStackNavigator();
const Cart = createStackNavigator();
const Addresses = createStackNavigator();

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

function CartRoutes() {
  return (
    <Cart.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'FredokaOne-Regular',
        },
        headerTintColor: '#5c2f0c',
      }}>
      <Cart.Screen
        name="CartHome"
        component={CartHome}
        options={{title: 'Seu carrinho 🛒'}}
      />
      <Cart.Screen
        name="SelectAddress"
        component={SelectAddress}
        options={{title: 'Selecionar endereço'}}
      />
    </Cart.Navigator>
  );
}

function AddressesRoutes() {
  return (
    <Addresses.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'FredokaOne-Regular',
        },
        headerTintColor: '#5c2f0c',
      }}>
      <Addresses.Screen
        name="AddressHome"
        component={AddressesHome}
        options={{title: 'Meus endereços'}}
      />
      <Addresses.Screen
        name="AddAddress"
        component={AddAddress}
        options={{title: 'Adicionar Endereço'}}
      />
    </Addresses.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={'Home'}
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'FredokaOne-Regular',
          },
          headerTintColor: '#5c2f0c',
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={BottomTabRoutes} />
        <Stack.Screen name="Shop" component={ShopRoutes} />
        <Stack.Screen name="CartHome" component={CartRoutes} />
        <Stack.Screen name="Addresses" component={AddressesRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
