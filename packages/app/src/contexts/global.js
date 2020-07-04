import React, {createContext, useState} from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
  });

  return (
    <GlobalContext.Provider globalState={state} setGlobalState={setState}>
      {children}
    </GlobalContext.Provider>
  );
};
