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

const GameForm = (props) => {
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
    name: "",
    genre: "",
    singlePlayer: "",
    multiplayer: "",
    platform: "",
    release: "",
    image_url: "",
    id: null,
  });

  const history = useHistory();
  const { parameter1 } = props.match.params;

  if (parameter1 !== "add" && input.name === "") {
    let game = dataGame.find((game) => game.id === parseInt(parameter1));
    setInput({ ...game });
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
    history.push("/datagame");
  };

  const handleSubmit = (id) => {
    if (id === null) {
      Axios.post(
        `https://backendexample.sanbersy.com/api/data-game`,
        {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,
          release: input.release,
          image_url: input.image_url,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
        .then((res) => {
          setDataGame([...dataGame, res.data]);
          history.push("/datagame");
        })
        .catch((err) => {
          console.log(err);
        });
      setInput({
        name: "",
        genre: "",
        singlePlayer: "",
        multiplayer: "",
        platform: "",
        release: "",
        image_url: "",
      });
    } else {
      Axios.put(
        `https://backendexample.sanbersy.com/api/data-game/${id}`,
        {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,
          release: input.release,
          image_url: input.image_url,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
        .then((res) => {
          let newGame = dataGame.map((game) => {
            if (game.id === input.id) {
              game.name = input.name;
              game.genre = input.genre;
              game.singlePlayer = input.singlePlayer;
              game.multiplayer = input.multiplayer;
              game.platform = input.platform;
              game.release = input.release;
              game.image_url = input.image_url;
            }
            return game;
          });
          setDataGame(newGame);
          history.push("/datagame");
        })
        .catch((err) => {
          console.log(err);
        });
      setInput({
        name: "",
        genre: "",
        singlePlayer: "",
        multiplayer: "",
        platform: "",
        release: "",
        image_url: "",
      });
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {parameter1 === "add" ? (
        <Typography variant="h4">Tambah Game</Typography>
      ) : (
        <Typography variant="h4">Edit Game</Typography>
      )}
      <form>
        <TextField
          id="standard-full-width"
          label="Nama"
          placeholder="Masukkan nama game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Image"
          placeholder="Masukkan image url game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="image_url"
          value={input.image_url}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Genre"
          placeholder="Masukkan genre game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="genre"
          value={input.genre}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Single Palyer"
          placeholder="Masukkan jumlah single player"
          fullWidth
          margin="normal"
          variant="outlined"
          name="singlePlayer"
          value={input.singlePlayer}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Multi Player"
          placeholder="Masukkan jumlah multi player"
          fullWidth
          margin="normal"
          variant="outlined"
          name="multiplayer"
          value={input.multiplayer}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Platform"
          placeholder="Masukkan platform game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="platform"
          value={input.platform}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Release"
          placeholder="Masukkan tahun release"
          fullWidth
          margin="normal"
          variant="outlined"
          name="release"
          value={input.release}
          onChange={handleChangeNumber}
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

export default GameForm;
