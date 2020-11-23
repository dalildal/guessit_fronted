import { RedirectUrl } from "./Router.js";

let page = document.querySelector("#page");

const WaitingRoomPage = () => {

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
  <h1 id="centerPage">SETTINGS<h1>
  <table class="table">
      <thead>
          <tr>
              <th scope="col">nbPlayer</th>
              <th scope="col">Round time</th>
              <th scope="col">nbRound</th>
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
      <input class="buttonHP" type="submit" value="Launch Game" />
    </form>
  </div>`;
  page.innerHTML = table;
  
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
