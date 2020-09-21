import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { DataContext } from "./DataContext";
import { Link } from "react-router-dom";

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
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  grid: {
    marginBottom: 50,
  },
}));

const Film = (props) => {
  const classes = useStyles();
  const { parameter1 } = props.match.params;
  const [dataFilm, setDataFilm, dataGame, setDataGame] = useContext(
    DataContext
  );

  let film =
    dataFilm != null &&
    dataFilm.find((film) => film.id === parseInt(parameter1));

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={12} className={classes.grid}>
          <Typography variant="h3" align="left">
            {film.title}
          </Typography>
          <div className={classes.wrap}>
            <img
              src={film.image_url}
              alt="gambar"
              height="400"
              className={classes.img}
            />
            <div>
              <Typography variant="h6" align="left">
                Judul : {film.title}
              </Typography>
              <Typography variant="h6" align="left">
                Durasi : {film.duration}
              </Typography>
              <Typography variant="h6" align="left">
                Genre : {film.genre}
              </Typography>
              <Typography variant="h6" align="left">
                Rating : {film.rating}
              </Typography>
              <Typography variant="h6" align="left">
                Tahun : {film.year}
              </Typography>
            </div>
          </div>
          <Typography variant="h6" align="left">
            Deskripsi : {film.description}
          </Typography>
          <Typography variant="h6" align="left">
            Review : {film.review === null ? "-" : film.review}
          </Typography>
        </Grid>
        <Button color="inherit">
          <Link className={classes.link} to="/">
            Kembali
          </Link>
        </Button>
      </Grid>
    </Container>
  );
};

export default Film;
