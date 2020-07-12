import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Hidden,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../contexts/global";
import parsePrice from "../../helpers/parsePrice";
import { baseURL } from "../../api";
import {
  BrokenImage as BrokenImageIcon,
  AddCircle as AddCircleIcon,
} from "@material-ui/icons";
import AddProduct from "../AddProduct";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  modalAppBar: {
    position: "relative",
  },
  modalTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar style={{ width: 50, height: 50 }}>
            {product.photos[0] ? (
              <img
                src={`${baseURL}${product.photos[0]}`}
                alt=""
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <BrokenImageIcon />
            )}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {product.name} de {product.flavor}
          </Typography>
          <Typography variant="body1">{parsePrice(product.price)}</Typography>
        </Grid>
      </Grid>
      {/* <Grid container justify="flex-end">
        <Button variant="contained" color="secondary">
          Remover
        </Button>
      </Grid> */}
    </Paper>
  );
};

export default function Products() {
  const [{ products }] = useContext(GlobalContext);
  const classes = useStyles();

  const [modalAdd, setModalAdd] = useState(false);

  return (
    <>
      <AddProduct open={modalAdd} close={() => setModalAdd(false)} />

      <Grid container spacing={2} direction="row">
        <Grid item xs>
          <Button
            className={classes.paper}
            style={{ width: "100%", height: "100%" }}
            variant="contained"
            color="primary"
            onClick={() => setModalAdd(true)}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <AddCircleIcon />
              <Typography variant="h6">Adicionar produto</Typography>
            </Grid>
          </Button>
        </Grid>
        <Hidden xsDown>
          {products.map((product) => {
            return (
              <Grid item xs={4} key={product._id}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Hidden>
        <Hidden smUp>
          {products.map((product) => {
            return (
              <Grid item xs={12} key={product._id}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Hidden>
      </Grid>
    </>
  );
}
