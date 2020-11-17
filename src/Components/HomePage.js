import { setLayout } from "../utils/render.js";
let homePage = `
<div id="centerPage">
  <img src="./images/guessItLogo.jpg" alt="logo GuessIt">
  <h2>Guess It</h2>
  <h4>Multiplayer game</h4>
  <div id="firstPartHomePage">
    <div id="secondPartHomePage">
      <button class="buttonHP">Create Game</button>
      <form>
          <input
            class="form-control"
            type="text"
            name="link"
            id="link"
            placeholder="Invitation Link"
          />
        <input class="buttonHP" type="submit" value="Join Game" />
      </form>
    </div>
  </div>
</div>
`;

/*let logo = fetch("/api/images", {
  method: "GET",
})*/

const HomePage = async () => {
  setLayout("Home");
  let page = document.querySelector("#page");
  page.innerHTML = homePage;

};

export default HomePage;