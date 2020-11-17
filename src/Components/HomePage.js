import { setLayout } from "../utils/render.js";
let homePage = `<div id="firstPartHomePage">
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
`;


const HomePage = async () => {
  setLayout("Home");
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
 
};

export default HomePage;