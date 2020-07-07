import React, {createContext, useState, useEffect, useCallback} from 'react';
import Storage from '../helpers/Storage';
import api from '../../api';
import {or} from 'react-native-reanimated';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
  const [globalState, setGlobalState] = useState({
    auth: {},
    cart: {},
    orders: [],
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
      await Storage.removeItem('orders');
      setGlobalState((old) => ({auth: {}, cart: {}, orders: []}));
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

  const setOrders = async (orders) => {
    try {
      await Storage.setItem('orders', orders);
      setGlobalState((old) => ({...old, orders}));
    } catch (error) {
      console.log('error set orders: ', error);
    }
  };

  const addOrder = (order) => {
    const newOrders = globalState.orders;
    newOrders.push(order);
    setOrders(newOrders);
  };

  const actions = {
    login,
    logout,
    setCart,
    clearCart,
    updateAddresses,
    setCartAddress,
    addOrder,
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

  const loadOrders = useCallback(async () => {
    try {
      if (globalState.auth.token) {
        const {data} = await api.get('/purchaser/order', {
          headers: {Authorization: `Bearer ${globalState.auth.token}`},
        });
        setOrders(data.orders);
      }
    } catch (error) {
      console.log('load orders error: ', error.response.data);
      const orders = await Storage.getItem('orders');
      setOrders(orders);
    }
  }, [globalState.auth]);

  useEffect(() => {
    loadAuth();
    loadCart();
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <GlobalContext.Provider value={[globalState, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
