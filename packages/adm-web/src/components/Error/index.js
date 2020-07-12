import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "10px 0",
    backgroundColor: "#f002",
    padding: "10px 15px",
    borderRadius: 20,
  },
  message: {
    color: "#f00",
    fontSize: 15,
  },
});

export default function Error({ message }) {
  const classes = useStyles();
  return (
    !!message && (
      <div className={classes.root}>
        <Typography className={classes.message}>{message}</Typography>
      </div>
    )
  );
}
