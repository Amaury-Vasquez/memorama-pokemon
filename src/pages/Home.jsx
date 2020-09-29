import React, { useState } from "react";
import Swal from "sweetalert2";

import Game from "../components/Game";
import Selection from "../components/Selection";

function Home() {
  const [startGame, setStart] = useState(false);
  const [name, setName] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [cardNumber, setNumber] = useState(10);
  return startGame ? (
    <Game
      name={name}
      region={radioValue}
      pokeNumber={cardNumber}
      callback={() => setStart(false)}
    />
  ) : (
    <Selection
      callback={(name, radioValue, cardNumber) => {
        if (radioValue === "" || name === "") {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Datos de usuario omitidos",
            footer: "Rellena los datos para empezar el juego",
          });
        } else {
          setStart(true);
          setName(name);
          setRadioValue(radioValue);
          setNumber(cardNumber);
        }
      }}
    />
  );
}

export default Home;
