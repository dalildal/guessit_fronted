import { RedirectUrl } from "./Router.js";

let createGamePage = `
<div id="centerPage">
  <h1>PARAMETRES</h1>
  <form>
    <label id="label" for="nbPlayer">NOMBRE DE JOUEURS</label>
    <input required type="number" class="form-control" id="nbPlayer" name="nbPlayer" min="2" max="10" placeholder="2-10">
    <label id="label" for="roundTime">LIMITE DE TEMPS PAR ROUND</label>
    <input required type="number" class="form-control" id="roundTime" name="roundTime" min="30" max="60" placeholder="30-60">
    <label id="label" for="nbRound">NOMBRE DE ROUND</label>
    <input required type="number" class="form-control" id="nbRound" name="nbRound" min="5" max="15" placeholder="5-15">
    <input class="buttonHP" type="submit" value="Créer une partie" />
  </form>
  <div id="gameCreated"></div>
</div>
`;


const CreateGamePage = () => {

  let page = document.querySelector("#page");
  page.innerHTML = createGamePage;
  let gameForm = document.querySelector("form");
  gameForm.addEventListener("submit", onCreateGame);

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
  document.getElementById("gameCreated").innerHTML = `<h1>Partie crée avec succès !</h1>`;
  setTimeout(() => RedirectUrl('/'),1500);
};

const onError = (err) => {
  let errorMessage = err.message;
  RedirectUrl("/error", errorMessage);
};


export default CreateGamePage;