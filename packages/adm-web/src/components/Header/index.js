import React, { useState, useContext } from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Hidden,
  SwipeableDrawer,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  Store as StoreIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/global";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Header({ children }) {
  const [, actions] = useContext(GlobalContext);
  const location = window.location.pathname.split("/")[1];
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer((v) => !v);
  };

  const MenuList = () => (
    <List>
      <ListItem
        button
        component={Link}
        to={"/"}
        onClick={toggleDrawer}
        selected={`/${location}` === "/"}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to={"/produtos"}
        onClick={toggleDrawer}
        selected={`/${location}` === "/produtos"}
      >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Produtos" />
      </ListItem>
    </List>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <Hidden smUp>
                  <IconButton
                    color="inherit"
                    className={classes.menuButton}
                    onClick={toggleDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Typography variant="h6">
                  Painel Administrativo | JV Trufas
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={actions.logout} color="inherit">
                Sair
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <MenuList />
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <SwipeableDrawer
          open={drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <div className={classes.toolbar} />
          <MenuList />
        </SwipeableDrawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
