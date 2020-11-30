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


let inGamePage = `
<div id="centerPage">
  <img id="logo2" src="${logo}" alt="logo GuessIt">
  <h1>Guess It</h1>
  <h4>Multiplayer game</h4>
    <div id="firstSquare">
      <div id="secondSquare">
        <div id="timer"></div>
        <div id="round"></div>
        <div id="image"></div>
        <div id="bottomDash"></div>
        <div id="answerForm"></div>
        <div id="state"></div>
      </div><!-- div id=secondSquare -->    
    </div><!-- div id=firstSquare -->
</div><!-- div id=centerPage -->`;

let page = document.querySelector("#page");
let actualRound = 1;
let myVar;
let imagesAlreadyDisplayed = new Array();
let correctAnswers = 0;
let endGamePage;
let isGameFinished = false;

const InGamePage = () => {
  page.innerHTML = inGamePage;
  
  onCallGame();

};

const onGameSettings = (data) => {
  if (!data) return;
  document.getElementById("state").innerHTML = ``;//On remet l'état à "zéro"
  clearInterval(myVar);//Je clear l'interval pour éviter qu'il y ait 2 timers lorsqu'une réponse est correcte
  myVar = setInterval(myTimer, 1000);

  let nbRound = data.nbRound;
  document.getElementById("round").innerHTML = `<h1>Round : ${actualRound}/${nbRound}</h1>`;
  if(actualRound > nbRound){
    //clearInterval(myVar);
    isGameFinished = true;
    onEndGame(data.nbRound);
    console.log("gameIsFinished");
  }
  let timer = data.roundTime;
  document.getElementById("timer").innerHTML = `<h1>${timer}</h1>`;//Je le mets avant la fonction pour qu'il soit mis dans l'html
  function myTimer() {
    document.getElementById("timer").innerHTML = `<h1>${timer}</h1>`;
    timer--;
    if(timer < 0){
      onCallGame();
      actualRound++;
      console.log("Temps écoulé");
      clearInterval(myVar);
    }
  }

  onCallImage();
};


const onGetImage = (data) => {
  if (!data) return;
  //Sert à savoir si une id a déjà été utilisée
  //Fonctionne mais ca serait mieux de gérer ça dans le backend
  /*if(imagesAlreadyDisplayed.includes(data.id)){
    onCallImage();
  }
  else{*/
    if(data.id === 1){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p1}" alt="${data.id}">`;
    }else if(data.id === 2){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p2}" alt="${data.id}">`;
    }else if(data.id === 3){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p3}" alt="${data.id}">`;
    }else if(data.id === 4){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p4}" alt="${data.id}">`;
    }else if(data.id === 5){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p5}" alt="${data.id}">`;
    }else if(data.id === 6){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p6}" alt="${data.id}">`;
    }else if(data.id === 7){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p7}" alt="${data.id}">`;
    }else if(data.id === 8){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p8}" alt="${data.id}">`;
    }else if(data.id === 9){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p9}" alt="${data.id}">`;
    }else if(data.id === 10){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p10}" alt="${data.id}">`;
    }else if(data.id === 11){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p11}" alt="${data.id}">`;
    }else if(data.id === 12){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p12}" alt="${data.id}">`;
    }else if(data.id === 13){
      document.getElementById("image").innerHTML = `<img style="width:50%;length:50%" src="${p13}" alt="${data.id}">`;
    }
  //}

  imagesAlreadyDisplayed.push(data.id);

  let bottomDash = `<h1><span>`;  
  for(let i=0; i<data.wordToFind.length; i++){
    bottomDash += ` _ `;
  }
  bottomDash += `</span></h1>`;

  document.getElementById("bottomDash").innerHTML = bottomDash;

  onCheckAnswer(data);
  
  };

  const onCheckAnswer = (data) => {
    document.getElementById("answerForm").innerHTML =`
    <form>
      <input class="form-control" type="text" name="answer" id="answer" placeholder="Enter answer"/>
      <input class="buttonHP" type="submit" value="Submit answer" />
    </form>`;

    document.getElementById("answer").focus();//Pour que le curseur aille directement dans le formulaire
    let answerForm = document.querySelector("form");

    answerForm.addEventListener("submit",(event) =>{
    event.preventDefault();
    let answer = answerForm.elements[0].value;
      
    if(answer === data.wordToFind){
      document.getElementById("state").innerHTML = `<h1>Bonne réponse !</h1>`;
      console.log("Bien joué le mot était", data.wordToFind);
      actualRound++;
      correctAnswers++;
      //setTimeout(onCallGame,1000);
      onCallGame();
    }else{
      document.getElementById("state").innerHTML = `<h1>Mauvaise réponse !</h1>`;
    }
    console.log("Réponse : " + answer);
  });
    if(isGameFinished){
      clearInterval(myVar);
      page.innerHTML = endGamePage;
    }
  }

  const onEndGame = (nbRound) => {
    console.log(correctAnswers + "/" + nbRound);
    endGamePage = 
    `<div id="centerPage">
      <img id="logo2" src="${logo}" alt="logo GuessIt">
      <h1>Guess It</h1>
      <h4>Multiplayer game</h4>
      <div id="firstSquare">
        <div id="secondSquare">
          <h1>Game Finished</h1>
          <h1>${correctAnswers}/${nbRound} Correct answers</h1>
        </div><!-- div id=secondSquare -->    
      </div><!-- div id=firstSquare -->
    </div><!-- div id=centerPage -->`;
  }

  const onError = (err) => {
    let errorMessage = err.message;
    RedirectUrl("/error", errorMessage);
  };

  const onCallGame = () => {
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
  }

  const onCallImage = () => {
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
  }

export default InGamePage;