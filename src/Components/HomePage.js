//import { setLayout } from "../utils/render.js";

let homePage = `
<div id="centerPage">
  <img src="/images/guessItLogo.jpg" alt="logo GuessIt">
  <h2>Guess It</h2>
  <h4>Multiplayer game</h4>
  <div id="firstPartHomePage">
    <div id="secondPartHomePage">
      <button class="buttonHP" href="/createGame">Create Game</button>
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

let page = document.querySelector("#page");

const HomePage = async () => {

  fetch("/api/images", {
    method: "GET",
  })
  .then((response) => {
    if (!response.ok)
      throw new Error(
        "Error code : " + response.status + " : " + response.statusText
      );
  })
  .then((data) => onFilmList(data))
  .catch((err) => onError(err));

  page.innerHTML = homePage;

};

const onFilmList = (data) => {
  if (!data) return;
  console.log("hey");
  data.forEach((element) => {
  page += `<img src=${element} alt="test">`;
  });
  page.innerHTML = homePage;

}
export default HomePage;