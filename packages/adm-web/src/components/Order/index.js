import React, { useContext, useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Button, Typography, Divider } from "@material-ui/core";
import api from "../../api";
import { GlobalContext } from "../../contexts/global";
import parsePrice from "../../helpers/parsePrice";

const statuses = {
  waiting: "Aguardando preparo",
  preparing: "Sendo preparado",
  delivered: "Pedido entregue",
  canceled: "Pedido cancelado",
};

const statusStyle = {
  waiting: {
    width: 20,
    height: 20,
    backgroundColor: "#D5B942",
    borderRadius: 20,
  },
  preparing: {
    width: 20,
    height: 20,
    backgroundColor: "#1B4079",
    borderRadius: 20,
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    minWidth: 300,
  },
  modalAppBar: {
    position: "relative",
  },
  modalTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function Order({ order }) {
  const classes = useStyles();

  const [{ auth }] = useContext(GlobalContext);
  const [total, setTotal] = useState("");
  const [showDetails, setShowDetails] = useState("");

  const handleShowDetails = (value) => () => {
    if (showDetails === value) {
      setShowDetails("");
    } else {
      setShowDetails(value);
    }
  };

  const loadTotal = useCallback(() => {
    let result = 0;
    for (let i in order.items) {
      result += order.items[i].price * order.items[i].amount;
    }
    setTotal(result);
  }, [order.items]);

  useEffect(() => {
    loadTotal();
  }, [loadTotal]);

  const update = (status) => async () => {
    try {
      await api.patch(
        `/admin/order/${order._id}`,
        { status },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
    } catch (error) {
      console.log("error update order status: ", error);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1} direction="column">
        <Grid item container alignItems="center" justify="space-between">
          <Typography variant="h6">Status: {statuses[order.status]}</Typography>
          <div style={statusStyle[order.status]} />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Typography variant="body1">
              Data do pedido:{" "}
              {new Intl.DateTimeFormat("pt-BR", {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }).format(new Date(order.registrationDate))}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Data de entrega:{" "}
              {new Intl.DateTimeFormat("pt-BR", {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }).format(new Date(order.deliveryDate))}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Preço: {parsePrice(total)}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleShowDetails("items")}
            >
              Ver itens
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleShowDetails("address")}
            >
              Detalhes da entrega
            </Button>
          </Grid>
        </Grid>
        {showDetails === "items" && (
          <Grid item container spacing={1} direction="column">
            {order.items.map((v, i) => (
              <Grid item key={`${v._id} ${i}`}>
                <Paper style={{ width: "100%", padding: 5 }}>
                  <Typography>
                    {v.amount} - {v.name} de {v.flavor}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        {showDetails === "address" && (
          <Grid item>
            <Paper style={{ width: "100%", padding: 5 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="body1">
                    <b>Cliente:</b> {order.purchaserId.name}
                  </Typography>
                  <Typography variant="body1">
                    <b>Whatsapp:</b> {order.purchaserId.whatsapp}
                  </Typography>
                  <Typography variant="body1">
                    <b>Email:</b> {order.purchaserId.email}
                  </Typography>
                </Grid>
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    <b>Rua:</b> {order.address.street}
                  </Typography>
                  <Typography variant="body1">
                    <b>Bairro:</b> {order.address.neighborhood}
                  </Typography>
                  <Typography variant="body1">
                    <b>Referência:</b> {order.address.landmark}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
        <Divider />
        <Grid item>
          <Typography variant="subtitle2">Alterar status para: </Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#D5B942" }}
              onClick={update("waiting")}
            >
              Esperando
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#1B4079" }}
              onClick={update("preparing")}
            >
              Preparando
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#8FAD88" }}
              onClick={update("delivered")}
            >
              Entregue
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#B6244F" }}
              onClick={update("canceled")}
            >
              Cancelado
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
