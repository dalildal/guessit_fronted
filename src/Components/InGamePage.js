
import { RedirectUrl } from "./Router.js";
import randomImage from "../images/1.png";


let pathDirectoryRandomImage = "../images/";

let inGamePage = `
<div id="centerPage">
  <h1>In game</h1>
</div>
`;

let page = document.querySelector("#page");

const InGamePage = () => {

  page.innerHTML = inGamePage;

  fetch("/api/images", {
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
    .then((data) => onGetImage(data))
    .catch((err) => onError(err));
};

const onGetImage= (data) => {
  if (!data) return;
  let pathRandomImage = pathDirectoryRandomImage + data.id + ".png";
  inGamePage += `
        <h1>${data.wordToFind}</h1>
        <h1>${pathRandomImage}</h1>
        <img id="logo" src="${randomImage}" alt="${data.id}">
      `;

  page.innerHTML = inGamePage;
  };

  const onError = (err) => {
    let errorMessage = err.message;
    RedirectUrl("/error", errorMessage);
  };

export default InGamePage;