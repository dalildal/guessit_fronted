//import { setLayout } from "../utils/render.js";

let createGamePage = `
<div id="centerPage">
  Page create Game
</div>
`;

let page = document.querySelector("#page");

const CreateGamePage = async () => {

  page.innerHTML = createGamePage;

};

export default CreateGamePage;