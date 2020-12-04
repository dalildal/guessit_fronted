//import { setLayout } from "../utils/render.js";
import logo from "../images/guessItLogo.png";
import { RedirectUrl } from "./Router.js";
import { setLayout } from "../utils/render";

let homePage = `

<div id="centerPage">
  <img id="logo" src="${logo}" alt="logo GuessIt">
  <h1>Guess It</h1>
  <h4>Multiplayer game</h4>
  <div id="firstPartHomePage">
    <div id="secondPartHomePage">
      <div id="createNameForm">
        <form>
          <input class="form-control" type="text" name="name" id="name" placeholder="pseudo"/>
          <input class="buttonHP" type="submit" value="Create Name" />
        </form>
      </div>
      <div id="createGameForm">
        <form action="/createGame">
        <input class="form-control" type="text" name="pseudo" id="pseudo" placeholder="pseudo"/>
          <input class="buttonHP" type="submit" value="Create Game" />
        </form>
      </div>
      <div id="joinGameForm">
        <form action="/chatRoom">
          <input class="form-control" type="text" name="pseudo" id="pseudo" placeholder="pseudo"/>
          <input class="buttonHP" type="submit" value="Join Game" />
        </form>
      </div>
    </div>
  </div>
</div>
`;

let page = document.querySelector("#page");

const HomePage = async () => {
  
  page.innerHTML = homePage;


  // let createNameForm = document.getElementById("createNameForm");
  // createNameForm.addEventListener("submit", onCreateName);
  // let createGameForm = document.getElementById("createGameForm");
  // createGameForm.addEventListener("submit", onCreateGame);
  // let joinGameForm = document.getElementById("joinGameForm");
  // joinGameForm.addEventListener("submit", onJoinGame);
};


const onCreateGame = (e) => {
  e.preventDefault();
  RedirectUrl("/createGame");
}

const onJoinGame = (e) => {
  e.preventDefault();
  RedirectUrl("/waitingRoom");
}



export default HomePage;