import { RedirectUrl } from "../Router.js";
import { setLayout } from "../../utils/render.js";
import { getUserSessionData } from "../../utils/session.js";


let addFilmPage = `<form>
<div class="form-group">
  <label for="title">Enter title</label>
  <input
    class="form-control"
    type="text"
    name="title"
    id="title"
    required
  />
</div>
<div class="form-group">
  <label for="duration">Enter duration</label>
  <input
    class="form-control"
    type="number"
    name="duration"
    id="duration"
    required
  />
</div>
<div class="form-group">
  <label for="budget">Enter budget</label>
  <input
    class="form-control"
    type="number"
    name="budget"
    id="budget"
    required
  />
</div>
<div class="form-group">
  <label for="link">Enter link</label>
  <input
    class="form-control"
    type="text"
    name="link"
    id="link"
    required
  />
</div>
<input type="submit" class="btn btn-primary" value="Add Film" />
</form>`;

const AddFilmPage = () => {
  setLayout("Add a film");

  let page = document.querySelector("#page");
  page.innerHTML = addFilmPage;
  let filmForm = document.querySelector("form");
  filmForm.addEventListener("submit", onAddFilm);
};

const onAddFilm = (e) => {
  e.preventDefault();
  let film = {
    title: document.getElementById("title").value,
    duration: document.getElementById("duration").value,
    budget: document.getElementById("budget").value,
    link: document.getElementById("link").value,
  };

  const user = getUserSessionData();

  fetch("/api/films/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(film), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
      Authorization: user.token,
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onFilmAdded(data))
    .catch((err) => onError(err));
};

const onFilmAdded = (data) => {
  console.log(data);
  // re-render the navbar for the authenticated user  
  RedirectUrl("/films");
};

const onError = (err) => {
  let errorMessage = err.message;
  RedirectUrl("/error", errorMessage);
};

export default AddFilmPage;
