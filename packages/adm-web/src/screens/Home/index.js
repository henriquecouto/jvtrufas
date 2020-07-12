import React, { useContext } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { GlobalContext } from "../../contexts/global";
import Order from "../../components/Order";

const renderOrders = (orders) => {
  return (
    <Grid container direction="column" spacing={2} style={{ marginTop: 10 }}>
      {orders.map((v) => {
        return (
          <Grid item key={v._id} style={{ width: "100%" }}>
            <Order order={v} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default function Home() {
  const [{ orders }] = useContext(GlobalContext);
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Typography variant="h4">Pedidos instantâneos</Typography>
        <Divider />
        {renderOrders(orders.instant)}
      </Grid>
      <Grid item xs>
        <Typography variant="h4">Pedidos agendados</Typography>
        <Divider />
        {renderOrders(orders.scheduled)}
      </Grid>
      {/* <Grid item xs>
        <Typography variant="h5">Pedidos instantâneos</Typography>
        <Divider />
      </Grid> */}
    </Grid>
  );
}
