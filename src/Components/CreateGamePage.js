//import { setLayout } from "../utils/render.js";

let createGamePage = `
<div id="centerPage">
  <h2>SETTINGS</h2>
  <form>
  <input type="number" class="form-control" id="nbPlayer" name="nbPlayer" min="2" max="10" placeholder="2-10">
  </form>
</div>
`;

let page = document.querySelector("#page");

const CreateGamePage = async () => {

  page.innerHTML = createGamePage;

};

export default CreateGamePage;