import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  Switch,
  Tooltip,
} from "@material-ui/core";
import { BrokenImage as BrokenImageIcon } from "@material-ui/icons";
import api, { baseURL } from "../../api";
import parsePrice from "../../helpers/parsePrice";
import { GlobalContext } from "../../contexts/global";

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
  const [{ auth }] = useContext(GlobalContext);

  const [productAvailable, setProductAvailable] = useState(false);

  useEffect(() => {
    // Feito dessa forma pq product.available pode ser undefined e undefined deve ser considerado como true
    setProductAvailable(product.available === false ? false : true);
  }, [product]);

  const handleProductAvailable = async () => {
    try {
      const { data } = await api.put(
        `/admin/product/${product._id}`,
        {
          available: !productAvailable,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setProductAvailable(data.item.available);
    } catch (error) {
      console.log(error.response.data);
      console.log(error);
    }
  };

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
        <Grid item xs>
          <Typography variant="h6">
            {product.name} de {product.flavor}
          </Typography>
          <Typography variant="body1">{parsePrice(product.price)}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Disponível">
            <Switch
              checked={productAvailable}
              onChange={handleProductAvailable}
            />
          </Tooltip>
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
