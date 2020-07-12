import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import { GlobalContextProvider } from "./contexts/global";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5c2f0c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff6600",
      contrastText: "#fff",
    },
  },
});

ReactDOM.render(
  <GlobalContextProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </GlobalContextProvider>,
  document.getElementById("root")
);
