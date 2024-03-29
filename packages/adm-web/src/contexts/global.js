import React, { createContext, useState, useCallback, useEffect } from "react";
import Storage from "../helpers/Storage";
import api from "../api";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    auth: {},
    products: [],
    activeInstant: false,
    orders: { scheduled: [], instant: [] },
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

  const toggleInstant = async () => {
    try {
      const { data } = await api.get("/admin/order/toggle-instant", {
        headers: { Authorization: `Bearer ${globalState.auth.token}` },
      });

      setGlobalState((old) => ({ ...old, activeInstant: data.active }));
    } catch (error) {
      console.log("error on toggle instant: ", error);
    }
  };

  const addProduct = async (product) => {
    const newProducts = globalState.products;
    newProducts.push(product);
    setGlobalState((old) => ({ ...old, products: newProducts }));
  };

  const actions = { login, logout, toggleInstant, addProduct };

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

  const loadProducts = useCallback(async () => {
    if (globalState.auth.token) {
      try {
        const { data } = await api.get("/admin/product", {
          headers: { Authorization: `Bearer ${globalState.auth.token}` },
        });
        setGlobalState((old) => ({ ...old, products: data.items }));
      } catch (error) {
        console.log("load products error: ", error);
      }
    }
  }, [globalState.auth]);

  const loadActiveInstant = useCallback(async () => {
    if (globalState.auth.token) {
      try {
        const { data } = await api.get("/admin/order/get-instant", {
          headers: { Authorization: `Bearer ${globalState.auth.token}` },
        });
        setGlobalState((old) => ({ ...old, activeInstant: data.active }));
      } catch (error) {
        console.log("error load active instant orders: ", error);
      }
    }
  }, [globalState.auth]);

  const runLoadOrders = async () => {
    if (globalState.auth.token) {
      try {
        console.log("load orders");
        const { data } = await api.get("/admin/order", {
          headers: { Authorization: `Bearer ${globalState.auth.token}` },
        });
        setGlobalState((old) => ({ ...old, orders: data }));
        setTimeout(runLoadOrders, 10000);
      } catch (error) {
        console.log("error load active instant orders: ", error);
      }
    }
  };

  const loadOrders = useCallback(runLoadOrders, [globalState.auth]);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadActiveInstant();
  }, [loadActiveInstant]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <GlobalContext.Provider value={[globalState, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
