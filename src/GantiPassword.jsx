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

const GantiPassword = () => {
  const classes = useStyles();
  const [
    dataFilm,
    setDataFilm,
    dataGame,
    setDataGame,
    user,
    setUser,
  ] = useContext(DataContext);
  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      "https://backendexample.sanbersy.com/api/change-password",
      {
        current_password: input.current_password,
        new_password: input.new_password,
        new_confirm_password: input.new_confirm_password,
      },
      { headers: { Authorization: `Bearer ${user.token}` } }
    ).then((res) => {
      alert(res.data);
      history.push("/");
    });
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h5">Ganti Password</Typography>
      <div className={classes.input}>
        <TextField
          label="Current Password"
          placeholder="Current Password..."
          margin="normal"
          variant="outlined"
          name="current_password"
          onChange={handleChange}
          type="password"
          size="small"
        ></TextField>
        <TextField
          label="New Password"
          placeholder="New Password..."
          margin="normal"
          variant="outlined"
          name="new_password"
          onChange={handleChange}
          type="password"
          size="small"
        ></TextField>
        <TextField
          label="Confirm Password"
          placeholder="Confirm Password..."
          margin="normal"
          variant="outlined"
          name="new_confirm_password"
          onChange={handleChange}
          type="password"
          size="small"
        ></TextField>
      </div>
      <Button onClick={handleSubmit} type="submit">
        submit
      </Button>
    </Container>
  );
};

export default GantiPassword;
