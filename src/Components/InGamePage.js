import { RedirectUrl } from "./Router.js";
import logo from "../images/guessItLogo.png";
import p1 from "../images/1.jpg";
import p2 from "../images/2.jpg";
import p3 from "../images/3.jpg";
import p4 from "../images/4.jpg";
import p5 from "../images/5.jpg";
import p6 from "../images/6.jpg";
import p7 from "../images/7.jpg";
import p8 from "../images/8.jpg";
import p9 from "../images/9.jpg";
import p10 from "../images/10.jpg";
import p11 from "../images/11.jpg";
import p12 from "../images/12.jpg";
import p13 from "../images/13.jpg";


//let pathDirectoryRandomImage = "../images/";

let inGamePage = `
<div id="centerPage">
  <img id="logo2" src="${logo}" alt="logo GuessIt">
  <h1>Guess It</h1>
  <h4>Multiplayer game</h4>
    <div id="firstSquare">
      <div id="secondSquare">
        <div id="timer"><h1>00</h1></div>
`;

let page = document.querySelector("#page");

const InGamePage = () => {
  page.innerHTML = inGamePage;

  
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
  var myVar = setInterval(myTimer, 1000);
  let timer = data.roundTime;

  function myTimer() {
    document.getElementById("timer").innerHTML = `<h1>${timer}</h1>`;
    timer--;
    if(timer < 0){
      console.log("Vous avez perdu");
      clearInterval(myVar);
    }
  }

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


const onGetImage = (data) => {
  if (!data) return;
  //let pathRandomImage =  data.id + ".png";
  if(data.id === 1){
    inGamePage += `<img style="width:50%;length:50%" src="${p1}" alt="${data.id}">`;
  }else if(data.id === 2){
    inGamePage += `<img style="width:50%;length:50%" src="${p2}" alt="${data.id}">`;
  }else if(data.id === 3){
    inGamePage += `<img style="width:50%;length:50%" src="${p3}" alt="${data.id}">`;
  }else if(data.id === 4){
    inGamePage += `<img style="width:50%;length:50%" src="${p4}" alt="${data.id}">`;
  }else if(data.id === 5){
    inGamePage += `<img style="width:50%;length:50%" src="${p5}" alt="${data.id}">`;
  }else if(data.id === 6){
    inGamePage += `<img style="width:50%;length:50%" src="${p6}" alt="${data.id}">`;
  }else if(data.id === 7){
    inGamePage += `<img style="width:50%;length:50%" src="${p7}" alt="${data.id}">`;
  }else if(data.id === 8){
    inGamePage += `<img style="width:50%;length:50%" src="${p8}" alt="${data.id}">`;
  }else if(data.id === 9){
    inGamePage += `<img style="width:50%;length:50%" src="${p9}" alt="${data.id}">`;
  }else if(data.id === 10){
    inGamePage += `<img style="width:50%;length:50%" src="${p10}" alt="${data.id}">`;
  }else if(data.id === 11){
    inGamePage += `<img style="width:50%;length:50%" src="${p11}" alt="${data.id}">`;
  }else if(data.id === 12){
    inGamePage += `<img style="width:50%;length:50%" src="${p12}" alt="${data.id}">`;
  }else if(data.id === 13){
    inGamePage += `<img style="width:50%;length:50%" src="${p13}" alt="${data.id}">`;
  }
  
  /*inGamePage += `
              <!--<h1>${data.wordToFind}</h1>-->
              <!--<h1>${pathRandomImage}</h1>-->
              <img style="width:50%;length:50%" src="${p5}" alt="${data.id}">
              <h1><span> `;*/
              inGamePage += `<h1><span>`;  
    
  for(let i=0; i<data.wordToFind.length; i++){
    inGamePage += ` _ `;
  }

  inGamePage += `</span></h1>
        <div id="answerForm">
          <form>
            <input class="form-control" type="text" name="answer" id="answer" placeholder="Enter answer"/>
            <input class="buttonHP" type="submit" value="Submit answer" />
          </form>
        </div>
      </div><!-- div id=secondSquare -->    
    </div><!-- div id=firstSquare -->
  </div><!-- div id=centerPage -->`;

  page.innerHTML = inGamePage;

  let answerForm = document.querySelector("form");
  answerForm.addEventListener("submit",(event) =>{
    event.preventDefault();
    let answer = answerForm.elements[0];
    if(answer.value === data.wordToFind){
      console.log("Bien joué le mot était", data.wordToFind);
      inGamePage += `<h1 style="margin-left:25%;margin-right:25%">Bien joué !</h1>`;
      page.innerHTML = inGamePage;

    }
    console.log("Réponse : " + answer.value);
  });


  };

  const onError = (err) => {
    let errorMessage = err.message;
    RedirectUrl("/error", errorMessage);
  };

export default InGamePage;