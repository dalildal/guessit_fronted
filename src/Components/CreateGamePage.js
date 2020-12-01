//import * as io from 'socket.io-client';
import { RedirectUrl } from "./Router.js";
import anime from 'animejs/lib/anime.es.js';

let createGamePage = `
<div id="centerPage">
<h1>SETTINGS</h1>
<form>
<label id="label" for="nbPlayer">NUMBER OF PLAYER</label>
<input required type="number" class="form-control" id="nbPlayer" name="nbPlayer" min="2" max="10" placeholder="2-10">
<label id="label" for="roundTime">ROUND TIME</label>
<input required type="number" class="form-control" id="roundTime" name="roundTime" min="30" max="60" placeholder="30-60">
<label id="label" for="nbRound">NUMBER OF ROUND</label>
<input required type="number" class="form-control" id="nbRound" name="nbRound" min="5" max="15" placeholder="5-15">
<input class="buttonHP" type="submit" value="Create Game" />
</form>
</div>
`;

const CreateGamePage = () => {
  
  
  let page = document.querySelector("#page");
  page.innerHTML = createGamePage;
  let gameForm = document.querySelector("form");
  gameForm.addEventListener("submit", onCreateGame);
  /**
   *  Animation with AnimeJS
   */

  const buttonHP = document.querySelector('.buttonHP');
  const mouseHoverAnimation = () =>{
    anime({
      targets: buttonHP,
      widht: '100%',
      scale: {
        delay: 100,
        value: 1.15
      },
      duration: 1500
    });
  }
  const mouseOutAnimation = () =>{
    anime({
      targets: buttonHP,
      widht: '50%',
      scale: {
        delay: 100,
        value: 1
      },
      duration: 1500
    });
  }
  buttonHP.addEventListener('mouseover', mouseHoverAnimation);
  buttonHP.addEventListener('mouseout', mouseOutAnimation);

};

const onCreateGame = (e) => {
  e.preventDefault();
  let game = {
    nbPlayer: document.getElementById("nbPlayer").value,
    roundTime: document.getElementById("roundTime").value,
    nbRound: document.getElementById("nbRound").value,
  };
  
  fetch("/api/games/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(game), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (!response.ok)
    throw new Error(
      "Error code : " + response.status + " : " + response.statusText
      );
      return response.json();
    })
    .then((data) => onGameCreated(data))
    .catch((err) => onError(err));
};

const onGameCreated = (data) => {
  console.log(data);
  RedirectUrl("/waitingRoom");
};

const onError = (err) => {
  let errorMessage = err.message;
  RedirectUrl("/error", errorMessage);
};



export default CreateGamePage;
