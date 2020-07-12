import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { project } from "jvtrufas-common";
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import api from "../../api";
import { GlobalContext } from "../../contexts/global";
import isValidEmail from "../../helpers/isValidEmail";
import Error from "../../components/Error";

const errorList = {
  "user not found": "Você não está cadastrado",
  "invalid password": "Sua senha está errada",
  "login failed": "Ocorreu um erro inesperado",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    margin: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
  },
  logoImg: {
    width: 150,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [, actions] = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Você digitou um email inválido");
      return;
    }

    if (!password) {
      setError("Insira a sua senha");
      return;
    }
    try {
      const { data } = await api.post("/auth/login", { email, password });
      actions.login(data);
    } catch (err) {
      setError(errorList[err.response.data.message]);
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logo}>
          <img src={project.logo} alt="" className={classes.logoImg} />
        </div>
        <Typography component="h1" variant="h5">
          Painel Administrativo
        </Typography>

        <form className={classes.form} onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={({ target: { value } }) => setEmail(value)}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target: { value } }) => setPassword(value)}
            value={password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
        <Error message={error} />
      </div>
    </Container>
  );
}
