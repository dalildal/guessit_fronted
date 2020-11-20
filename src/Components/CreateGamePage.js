//import { setLayout } from "../utils/render.js";

let createGamePage = `
<div id="centerPage">
  <h1>SETTINGS</h1>
  <form>
  <label id="label" for="nbPlayer">NUMBER OF PLAYER</label>
  <input type="number" class="form-control" id="nbPlayer" name="nbPlayer" min="2" max="10" placeholder="2-10">
  <label id="label" for="roundTime">ROUND TIME</label>
  <input type="number" class="form-control" id="roundTime" name="roundTime" min="30" max="60" placeholder="60">
  <label id="label" for="nbRound">NUMBER OF ROUND</label>
  <input type="number" class="form-control" id="nbRound" name="nbRound" min="5" max="15" placeholder="5-15">
  <form action="/createGame">
  <input class="buttonHP" type="submit" value="Create Game" />
  <label id="label" for="inviteLink">INVITE LINK</label>
  <input type="text" class="form-control" id="inviteLink" name="inviteLink"  placeholder="Link">
  </form>
</div>
`;

let page = document.querySelector("#page");

const CreateGamePage = async () => {

  page.innerHTML = createGamePage;

};

export default CreateGamePage;