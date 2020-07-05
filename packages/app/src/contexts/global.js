import React, {createContext, useState, useEffect} from 'react';
import Storage from '../helpers/Storage';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
  const [globalState, setGlobalState] = useState({
    auth: {},
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
      setGlobalState((old) => ({...old, auth: {}}));
    } catch (error) {
      console.log('global start logout error: ', error);
    }
  };

  const actions = {login, logout};

  const loadAuth = async () => {
    try {
      const auth = await Storage.getItem('auth');
      setGlobalState((old) => ({...old, auth}));
    } catch (error) {
      console.log('global state load auth error: ', error);
    }
  };

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <GlobalContext.Provider value={[globalState, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
