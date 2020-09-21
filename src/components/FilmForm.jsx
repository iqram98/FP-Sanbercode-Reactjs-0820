import React, { useState, useContext } from "react";
import { DataContext } from "./DataContext";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
}));

const TambahFilm = (props) => {
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
    title: "",
    description: "",
    review: "",
    year: "",
    duration: "",
    genre: "",
    rating: "0",
    image_url: "",
    id: null,
  });

  const history = useHistory();
  const { parameter1 } = props.match.params;

  if (parameter1 !== "add" && input.title === "") {
    let film = dataFilm.find((film) => film.id === parseInt(parameter1));
    setInput({ ...film });
  }

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleChangeNumber = (event) => {
    if (isNaN(parseInt(event.target.value))) {
      setInput({ ...input, [event.target.name]: "" });
    } else {
      setInput({ ...input, [event.target.name]: event.target.value });
    }
  };

  const handleCancel = () => {
    history.push("/datafilm");
  };

  const handleSubmit = (id) => {
    if (id === null) {
      Axios.post(
        `https://backendexample.sanbersy.com/api/data-movie`,
        {
          title: input.title,
          description: input.description,
          review: input.review,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: input.rating,
          image_url: input.image_url,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
        .then((res) => {
          setDataFilm([...dataFilm, res.data]);
          history.push("/datafilm");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setInput({
        title: "",
        description: "",
        review: "",
        year: "",
        duration: "",
        genre: "",
        rating: "",
        image_url: "",
      });
    } else {
      Axios.put(
        `https://backendexample.sanbersy.com/api/data-movie/${id}`,
        {
          title: input.title,
          description: input.description,
          review: input.review,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: input.rating,
          image_url: input.image_url,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
        .then((res) => {
          let newFilm = dataFilm.map((film) => {
            if (film.id === input.id) {
              film.title = input.title;
              film.description = input.description;
              film.review = input.review;
              film.year = input.year;
              film.duration = input.duration;
              film.genre = input.genre;
              film.rating = input.rating;
              film.image_url = input.image_url;
            }
            return film;
          });
          setDataFilm(newFilm);
          history.push("/datafilm");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setInput({
        title: "",
        description: "",
        review: "",
        year: "",
        duration: "",
        genre: "",
        rating: "",
        image_url: "",
      });
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {parameter1 === "add" ? (
        <Typography variant="h4">Tambah Film</Typography>
      ) : (
        <Typography variant="h4">Edit Film</Typography>
      )}
      <form>
        <TextField
          id="standard-full-width"
          label="Judul"
          placeholder="Masukkan judul film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Image"
          placeholder="Masukkan image url film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="image_url"
          value={input.image_url}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Durasi"
          placeholder="Masukkan durasi film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="duration"
          value={input.duration}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Genre"
          placeholder="Masukkan genre film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="genre"
          value={input.genre}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Rating"
          placeholder="Masukkan rating film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="rating"
          value={input.rating}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Year"
          placeholder="Masukkan tahun film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="year"
          value={input.year}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Deskripsi"
          placeholder="Masukkan deskripsi film"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline={true}
          rows="5"
          name="description"
          value={input.description}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Review"
          placeholder="Masukkan review film"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline={true}
          rows="5"
          name="review"
          value={input.review}
          onChange={handleChange}
        />
        <Button
          onClick={() => handleCancel()}
          variant="contained"
          color="secondary"
          disableElevation
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(input.id)}
          variant="contained"
          color="primary"
          disableElevation
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default TambahFilm;
