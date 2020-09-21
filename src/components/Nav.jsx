import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { DataContext } from "./DataContext";
import Login from "../Login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 60,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  setting: {
    position: "absolute",
    display: "flex",
    flexFlow: "column",
    width: 150,
    right: 10,
    backgroundColor: "white",
    border: "1px solid grey",
    borderRadius: 10,
  },
}));

const Nav = () => {
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
  const [login, setLogin] = useState("false");
  const [setting, setSetting] = useState("false");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
    console.log(user);
  };

  const handleLogin = () => {
    if (login === "false") {
      setLogin("true");
      console.log(login);
    } else {
      setLogin("false");
      console.log(login);
    }
  };

  const handleSetting = () => {
    if (setting === "false") {
      setSetting("true");
    } else {
      setSetting("false");
    }
  };

  const handleGanti = () => {
    history.push("/gantipassword");
    setSetting("false");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" align="left" className={classes.title}>
            Final Project
          </Typography>
          <div>
            <Button color="inherit">
              <Link className={classes.link} to="/">
                Home
              </Link>
            </Button>
            {user === null ? (
              <>
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
                {login == "true" ? <Login register={handleLogin} /> : <></>}
              </>
            ) : (
              <>
                <Button color="inherit">
                  <Link className={classes.link} to="/datafilm">
                    Film
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={classes.link} to="/datagame">
                    Game
                  </Link>
                </Button>
                <Button color="inherit" onClick={handleSetting}>
                  Pengaturan
                </Button>
                {setting === "true" ? (
                  <div className={classes.setting}>
                    <Button onClick={handleGanti}>Ganti Password</Button>
                    <Button onClick={handleLogout}>Logout</Button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
