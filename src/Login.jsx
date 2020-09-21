import Axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DataContext } from "./components/DataContext";
import { Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: 250,
    right: 10,
    backgroundColor: "white",
    border: "1px solid grey",
    borderRadius: 10,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Registrasi = (props) => {
  const classes = useStyles();
  const [
    dataFilm,
    setDataFilm,
    dataGame,
    setDataGame,
    user,
    setUser,
  ] = useContext(DataContext);
  const [input, setInput] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email,
      password: input.password,
    })
      .then((res) => {
        let user = res.data.user;
        let token = res.data.token;
        let currentUser = { email: user.email, token };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        window.location.href = "/";
      })
      .catch((err) => {
        alert("Username atau Password salah");
      });
  };

  const handleRegister = () => {
    props.register();
    history.push("/registrasi");
  };

  return (
    <div className={classes.root}>
      <form method="post" onSubmit={handleSubmit}>
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
        <Button type="submit">submit</Button>
        <Typography color="primary" variant="body2">
          Atau
        </Typography>
        <Button type="submit" onClick={handleRegister} color="default">
          Buat Akun
        </Button>
      </form>
    </div>
  );
};

export default Registrasi;
