import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Card } from "@material-ui/core";
import { DataContext } from "./DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  divider: {
    paddingTop: 20,
    flexFlow: "row",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 50,
  },
  card: {
    width: 300,
    margin: 10,
  },
  image: {
    height: 300,
    overflow: "hidden",
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  target: {
    height: 80,
  },
  link: {
    textDecoration: "none",
  },
  overflow: {
    display: "box",
    padding: 8,
    textAlign: "justify",
    height: 120,
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineClamp: 6,
    boxOrient: "vertical",
  },
}));

const Main = () => {
  const classes = useStyles();
  const [dataFilm, setDataFilm, dataGame, setDataGame] = useContext(
    DataContext
  );

  return (
    <div className={classes.root}>
      <div id="film" className={classes.target}>
        <Typography variant="h3" align="left">
          Film & Game Review
        </Typography>
      </div>
      <Typography variant="h4" align="left">
        List Film
      </Typography>
      <div className={classes.divider}>
        {dataFilm !== null &&
          dataFilm.map((film) => {
            return (
              <Card key={film.id} className={classes.card}>
                <CardContent>
                  <Typography
                    color="textPrimary"
                    align="left"
                    gutterBottom
                    variant="h5"
                  >
                    {film.title}
                  </Typography>
                  <div className={classes.image}>
                    <img src={film.image_url} alt="gambar" width="200" />
                  </div>
                  <div className={classes.overflow}>{film.description}</div>
                </CardContent>
                <CardActions>
                  <Link to={`/film/${film.id}`} className={classes.link}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
      </div>
      <div id="game" className={classes.target}></div>
      <Typography variant="h4" align="left">
        List Game
      </Typography>
      <div className={classes.divider}>
        {dataGame !== null &&
          dataGame.map((game) => {
            return (
              <Card key={game.id} className={classes.card}>
                <CardContent>
                  <Typography
                    color="textPrimary"
                    align="left"
                    gutterBottom
                    variant="h5"
                  >
                    {game.name}
                  </Typography>
                  <div className={classes.image}>
                    <img src={game.image_url} alt="gambar" width="200" />
                  </div>
                  <Typography align="left">
                    Platform : {game.platform}
                  </Typography>
                  <Typography align="left">Genre : {game.genre}</Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/game/${game.id}`} className={classes.link}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Main;
