//import { setLayout } from "../utils/render.js";
import logo from "../images/guessItLogo.png";
import { RedirectUrl } from "./Router.js";

let homePage = `
<div id="centerPage">
  <img id="logo" src="${logo}" alt="logo GuessIt">
  <h1>Guess It</h1>
  <h4>Multiplayer game</h4>
  <div id="firstPartHomePage">
    <div id="secondPartHomePage">
      <form>
        <input class="buttonHP" type="submit" value="Create Game" />
      </form>
      <form>
        <input class="form-control" type="text" name="link" id="link" placeholder="Invitation Link"/>
        <input class="buttonHP" type="submit" value="Join Game" />
      </form>
    </div>
  </div>
</div>
`;

let page = document.querySelector("#page");

const HomePage = async () => {

  page.innerHTML = homePage;

  let createGameForm = document.querySelector("form");
  createGameForm.addEventListener("submit", onSubmit);
};

const onSubmit = (e) => {
  e.preventDefault();
  RedirectUrl("/createGame");
}

export default HomePage;