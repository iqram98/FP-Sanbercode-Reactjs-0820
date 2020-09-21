import React, { useState, useEffect, createContext } from "react";
import Axios from "axios";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [dataFilm, setDataFilm] = useState(null);
  const [dataGame, setDataGame] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const initiateUser = currentUser ? currentUser : null;
  const [user, setUser] = useState(initiateUser);

  useEffect(() => {
    if (dataFilm === null) {
      Axios.get(`https://backendexample.sanbersy.com/api/data-movie`).then(
        (res) => {
          setDataFilm(res.data);
        }
      );
    }
    if (dataGame === null) {
      Axios.get(`https://backendexample.sanbersy.com/api/data-game`).then(
        (res) => {
          setDataGame(res.data);
        }
      );
    }
  });

  return (
    <DataContext.Provider
      value={[dataFilm, setDataFilm, dataGame, setDataGame, user, setUser]}
    >
      {props.children}
    </DataContext.Provider>
  );
};
