import React, {createContext, useState, useEffect} from 'react';
import Storage from '../helpers/Storage';
import api from '../../api';
import {add} from 'react-native-reanimated';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
  const [globalState, setGlobalState] = useState({
    auth: {},
    cart: {},
  });

  const login = async (data) => {
    try {
      await Storage.setItem('auth', data);
      setGlobalState((old) => ({...old, auth: data}));
    } catch (error) {
      console.log('global state login error: ', error);
    }
  };

  const logout = async () => {
    try {
      await Storage.removeItem('auth');
      await Storage.removeItem('cart');
      setGlobalState((old) => ({auth: {}, cart: {}}));
    } catch (error) {
      console.log('global start logout error: ', error);
    }
  };

  const setCart = async (data) => {
    try {
      await Storage.setItem('cart', data);
      setGlobalState((old) => ({...old, cart: data}));
    } catch (error) {
      console.log('global state create cart error: ', error);
    }
  };

  const clearCart = async () => {
    try {
      await Storage.removeItem('cart');
      setGlobalState((old) => ({...old, cart: {}}));
    } catch (error) {
      console.log('global start clear cart error: ', error);
    }
  };

  const updateAddresses = async (addresses) => {
    const newAuth = globalState.auth;
    newAuth.user.addresses = addresses;
    await login(newAuth);
  };

  const setCartAddress = (address) => {
    const newCart = globalState.cart;
    newCart.address = address;
    setCart(newCart);
  };

  const actions = {
    login,
    logout,
    setCart,
    clearCart,
    updateAddresses,
    setCartAddress,
  };

  const loadAuth = async () => {
    try {
      const auth = await Storage.getItem('auth');
      setGlobalState((old) => ({...old, auth}));
    } catch (error) {
      console.log('global state load auth error: ', error);
    }
  };

  const loadCart = async () => {
    try {
      const cart = await Storage.getItem('cart');
      setGlobalState((old) => ({...old, cart}));
    } catch (error) {
      console.log('global state load cart error: ', error);
    }
  };

  useEffect(() => {
    loadAuth();
    loadCart();
  }, []);

  return (
    <GlobalContext.Provider value={[globalState, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
