import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { DataContext } from "./DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  wrap: {
    overflowY: "hidden",
    marginBottom: 30,
    display: "flex",
    marginTop: 50,
    flexWrap: "wrap",
  },
  img: {
    marginRight: 30,
  },
}));

const Game = (props) => {
  const classes = useStyles();
  const { parameter1 } = props.match.params;
  const [dataFilm, setDataFilm, dataGame, setDataGame] = useContext(
    DataContext
  );

  let game =
    dataGame != null &&
    dataGame.find((game) => game.id === parseInt(parameter1));
  console.log(game);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" align="left">
            {game.name}
          </Typography>
          <div className={classes.wrap}>
            <img
              src={game.image_url}
              alt="gambar"
              height="400"
              className={classes.img}
            />
          </div>
          <Typography variant="h6" align="left">
            Judul : {game.name}
          </Typography>
          <Typography variant="h6" align="left">
            Platform : {game.platform}
          </Typography>
          <Typography variant="h6" align="left">
            Genre : {game.genre}
          </Typography>
          <Typography variant="h6" align="left">
            Single Player : {game.singlePlayer}
          </Typography>
          <Typography variant="h6" align="left">
            Multi Player : {game.multiplayer}
          </Typography>
          <Typography variant="h6" align="left">
            Release : {game.release}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
