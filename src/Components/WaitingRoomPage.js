import { RedirectUrl } from "./Router.js";
import * as io from 'socket.io-client';

let page = document.querySelector("#page");


const WaitingRoomPage = () => {

const socket = io('localhost:3000');

socket.on('connect', () => { // Quand la connexion est établie
  console.log('Socket Client ID:' + socket.id); // 'G5p5...'
  console.log('Hello this is a test');
});

  fetch("/api/games", {
    method: "GET",
    headers: {
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onGameSettings(data))
    .catch((err) => onError(err));
};

const onGameSettings = (data) => {
  if (!data) return;
  let table = `
  <div id="tableSettings" class="table-responsive mt-3">
  <h1 id="centerPage">PARAMETRES<h1>
  <table class="table">
      <thead>
          <tr>
              <th scope="col">Nombre de joueurs</th>
              <th scope="col">Limite de temps par round</th>
              <th scope="col">Nombre de round</th>
          </tr>
      </thead>
  <tbody>`;

      table += `
      <tr>
        <td>${data.nbPlayer}</td>
        <td>${data.roundTime}</td>
        <td>${data.nbRound}</td>
      </tr>
        `;
  table += `
  </tbody>
  </table>
  </div>
  <div id="centerPage">
    <form>
      <input class="buttonHP" type="submit" value="Lancer la partie" />
    </form>
  </div>`;
  page.innerHTML = table;
  
  page.innerHTML += `<h1 id="centerPage">JOUEURS</h1>`;

  
  let launchGameForm = document.querySelector("form");
  launchGameForm.addEventListener("submit", onLaunchGame);
};

const onError = (err) => {
  let errorMessage = err.message;
  RedirectUrl("/error", errorMessage);
};

const onLaunchGame = (e) => {
  e.preventDefault();
  RedirectUrl("/inGame");
}





export default WaitingRoomPage;
