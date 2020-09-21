import React from "react";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));
const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Main />
        </Grid>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
