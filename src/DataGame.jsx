import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import GameTable from "./components/GameTable";

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
const DataGame = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <GameTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataGame;
