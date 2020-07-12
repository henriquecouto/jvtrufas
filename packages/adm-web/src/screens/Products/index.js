import React, { useContext, useState } from "react";
import { Grid, Typography, Hidden, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../contexts/global";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";
import AddProduct from "../AddProduct";
import Product from "../../components/Product";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

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
