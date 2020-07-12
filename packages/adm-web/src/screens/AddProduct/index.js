import React, { useState, useContext } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Slide,
  makeStyles,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import api from "../../api";
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
  form: {
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(1, 3),
  },
  inputImage: {
    display: "none",
  },
  images: {
    marginTop: theme.spacing(1.5),
  },
  imageItem: {
    width: 200,
    height: 200,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProduct({ open, close }) {
  const classes = useStyles();

  const [{ auth }, actions] = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [flavor, setFlavor] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photosShow, setPhotosShow] = useState([]);

  const handleImages = async (event) => {
    const urls = [];
    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("img", event.target.files[i]);
      urls.push(URL.createObjectURL(event.target.files[i]));
    }
    setPhotosShow(urls);
    setPhotos(formData);
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      const reqPhotos = await api.post("/admin/product/upload", photos, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const urls = []; //urls.data.map((v) => "/public" + v);
      for (let i = 0; i < reqPhotos.data.length; i++) {
        urls.push("/public" + reqPhotos.data[i]);
      }

      const { data } = await api.post(
        "/admin/product",
        {
          name,
          flavor,
          price,
          photos: urls,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      actions.addProduct(data.item);
      close();
    } catch (error) {
      console.log("error add item: ", error.response.data);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.modalAppBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={close}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.modalTitle}>
                  Adicionar Produto
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button autoFocus color="inherit" onClick={save}>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <form className={classes.form} onSubmit={save}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={({ target: { value } }) => setName(value)}
              value={name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="flavor"
              label="Sabor"
              name="flavor"
              autoComplete="name"
              onChange={({ target: { value } }) => setFlavor(value)}
              value={flavor}
            />
            <FormControl required fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="price">Preço</InputLabel>
              <OutlinedInput
                id="price"
                value={price}
                onChange={({ target: { value } }) => setPrice(value)}
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
            <div className={classes.images}>
              <input
                accept="image/*"
                className={classes.inputImage}
                id="photos"
                multiple
                type="file"
                onChange={handleImages}
              />
              <label htmlFor="photos">
                <Button variant="contained" color="primary" component="span">
                  Selecionar Images
                </Button>
              </label>
            </div>
          </form>
        </Grid>
        <Grid item style={{ padding: 10 }}>
          <Grid container spacing={2}>
            {photosShow.map((v) => (
              <Grid item xs key={v}>
                <img src={v} alt="" className={classes.imageItem} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
