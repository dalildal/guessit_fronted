import { RedirectUrl } from "../Router.js";
import { setLayout } from "../../utils/render.js";
import { getUserSessionData } from "../../utils/session.js";

let page = document.querySelector("#page");

const FilmListPage = () => {
  setLayout("List of films");
  const user = getUserSessionData();

  fetch("/api/films", {
    method: "GET",
    headers: {
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
    .then((data) => onFilmList(data))
    .catch((err) => onError(err));
};

const onFilmList = (data) => {
  if (!data) return;
  let table = `
  <div id="tableFilms" class="table-responsive mt-3">
  <table class="table">
      <thead>
          <tr>
              <th scope="col">Title</th>
              <th scope="col">Link</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Budget (million)</th>
              <th>Save</th>
              <th>Delete</th>
          </tr>
      </thead>
      <tbody>`;

  data.forEach((element) => {
    table += `<tr data-id="${element.id}">
                <td contenteditable="true">${element.title}</td>
                <td contenteditable="true"><a href="${element.link}" target="_blank">${element.link}</a></td>
                <td contenteditable="true">${element.duration}</td>
                <td contenteditable="true">${element.budget}</td>
                <td><button class="btn btn-primary save">Save</button></td>
                <td><button class="btn btn-dark delete">Delete</button></td>
            </tr>
            `;
  });

  table += `</tbody>
  </table>
  </div>`;
  page.innerHTML = table;

  const saveBtns = document.querySelectorAll(".save");
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", onDelete);
  });

  saveBtns.forEach((saveBtn) => {
    saveBtn.addEventListener("click", onSave);
  });
};

const onSave = (e) => {
  // the id is given in the current table row under data-id attribute
  const filmId = e.target.parentElement.parentElement.dataset.id;
  let film = {};
  const tr = e.target.parentElement.parentElement;
  const cells = tr.querySelectorAll("td");
  film.title = cells[0].innerText;
  film.link = cells[1].innerText;
  film.duration = cells[2].innerText;
  film.budget = cells[3].innerText;
  console.log("Film:", film);
  const user = getUserSessionData();

  fetch("/api/films/" + filmId, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
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
    .then((data) => FilmListPage())
    .catch((err) => onError(err));
};

const onDelete = (e) => {
  // the id is given in the current table row under data-id attribute
  const filmId = e.target.parentElement.parentElement.dataset.id;
  const user = getUserSessionData();
  fetch("/api/films/" + filmId, {
    method: "DELETE",
    headers: {
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
    .then((data) => FilmListPage())
    .catch((err) => onError(err));
};

const onError = (err) => {
  console.error("UserListPage::onError:", err);
  let errorMessage = "Error";
  if (err.message) {
    if (err.message.includes("401"))
      errorMessage =
        "Unauthorized access to this ressource : you must first login.";
    else errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default FilmListPage;
