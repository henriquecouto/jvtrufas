import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5c2f0c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff6600",
      contrastText: "#212121",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Painel Administrativo | JV Trufas
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default App;
