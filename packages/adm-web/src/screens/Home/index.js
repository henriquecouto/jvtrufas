import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";

export default function Home() {
  return (
    <Grid>
      <Typography variant="h5">Pedidos agendados</Typography>
      <Divider />
      <Typography variant="h5">Pedidos instantâneos</Typography>
      <Divider />
    </Grid>
  );
}
