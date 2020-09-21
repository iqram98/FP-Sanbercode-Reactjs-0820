import Axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { DataContext } from "./components/DataContext";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    marginTop: 70,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    display: "flex",
    flexFlow: "column",
  },
}));

const Registrasi = () => {
  const classes = useStyles();
  const [
    dataFilm,
    setDataFilm,
    dataGame,
    setDataGame,
    user,
    setUser,
  ] = useContext(DataContext);
  const history = useHistory();
  const [input, setInput] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name,
      email: input.email,
      password: input.password,
    }).then((res) => {
      let user = res.data.user;
      let token = res.data.token;
      let currentUser = { name: user.name, email: user.email, token };
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
      history.push("/");
    });
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h5">Registrasi</Typography>
      <form action="">
        <div className={classes.input}>
          <TextField
            label="Nama"
            placeholder="Nama..."
            margin="normal"
            variant="outlined"
            name="name"
            onChange={handleChange}
            type="text"
            size="small"
          ></TextField>
          <TextField
            label="Email"
            placeholder="Email..."
            margin="normal"
            variant="outlined"
            name="email"
            onChange={handleChange}
            type="email"
            size="small"
          ></TextField>
          <TextField
            label="Password"
            placeholder="Password..."
            margin="normal"
            variant="outlined"
            name="password"
            onChange={handleChange}
            type="password"
            size="small"
          ></TextField>
          <Button onClick={handleSubmit} type="submit">
            submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Registrasi;
