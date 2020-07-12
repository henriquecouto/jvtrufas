import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Avatar, Typography } from "@material-ui/core";
import { BrokenImage as BrokenImageIcon } from "@material-ui/icons";
import { baseURL } from "../../api";
import parsePrice from "../../helpers/parsePrice";

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

export default function Product({ product }) {
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
}
