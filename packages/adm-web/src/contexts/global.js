import React, { createContext, useState, useCallback, useEffect } from "react";
import Storage from "../helpers/Storage";
import api from "../api";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    auth: {},
  });

  const login = async (data) => {
    data.date = new Date();
    try {
      await Storage.setItem("auth", data);
      setGlobalState((old) => ({ ...old, auth: data }));
    } catch (error) {
      console.log("global state login error: ", error);
    }
  };

  const logout = async () => {
    try {
      await Storage.removeItem("auth");
      setGlobalState({ auth: {} });
    } catch (error) {
      console.log("global start logout error: ", error);
    }
  };

  const actions = { login, logout };

  const loadAuth = useCallback(async () => {
    try {
      const auth = await Storage.getItem("auth");

      const lastLogin = new Date(auth.date).getTime();
      const now = Date.now();

      if (now - lastLogin >= 86400000 * 25) {
        logout();
      } else if (now - lastLogin >= 86400000 * 2) {
        const { data } = await api.get("/auth/request-token", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        login(data);
      } else {
        setGlobalState((old) => ({ ...old, auth }));
      }
    } catch (error) {
      console.log("global state load auth error: ", error);
      console.log(error.response.data);
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  return (
    <GlobalContext.Provider value={[globalState, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
