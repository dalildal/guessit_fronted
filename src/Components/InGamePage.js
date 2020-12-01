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
  <h4>Jeu multijoueur</h4>
    <div id="firstSquare">
      <div id="secondSquare">
        <div id="timer"></div>
        <div id="round"></div>
        <div id="image"></div>
        <div id="bottomDash"></div>
        <div id="state"></div>
        <div id="answerForm"></div>
      </div><!-- div id=secondSquare -->    
    </div><!-- div id=firstSquare -->
</div><!-- div id=centerPage -->`;

let page = document.querySelector("#page");
let actualRound = 1;
let myVarForTimer;
let imagesToDisplay = new Array(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13);
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
  clearInterval(myVarForTimer);//Je clear l'interval pour éviter qu'il y ait 2 timers lorsqu'une réponse est correcte
  myVarForTimer = setInterval(myTimer, 1000);

  let nbRound = data.nbRound;
  document.getElementById("round").innerHTML = `<h1>Round : ${actualRound}/${nbRound}</h1>`;
  if(actualRound > nbRound){ //Quand la partie est finie
    isGameFinished = true;
    onEndGame(data.nbRound);
    console.log("gameIsFinished");
  }
  
  let timer = data.roundTime;
  document.getElementById("timer").innerHTML = `<h1>${timer}</h1>`;//Je le mets avant la fonction pour qu'il soit mis dans l'html
  function myTimer() { //Fonction pour actualiser le timer à chaque seconde
    document.getElementById("timer").innerHTML = `<h1>${timer}</h1>`; 
    timer--;
    if(timer < 0){ //Si le timer est écoulé
      onCallGame();
      actualRound++;
      console.log("Temps écoulé");
      clearInterval(myVarForTimer);
    }
  }
  onCallImage();
};

//Récupère l'image à afficher via un appel API mis dans la const onCallImage()
const onGetImage = (data) => {
  if (!data) return;
  //Sert à savoir si une id a déjà été utilisée
  //Fonctionne mais ca serait mieux de gérer ça dans le backend(Mais c'est plus compliqué)
  if(imagesAlreadyDisplayed.includes(data.id)){
    console.log("Image déjà affichée :",data.wordToFind);
    onCallImage();
  }
  else{
    document.getElementById("image").innerHTML = `<img style="width:50%" id="displayedImage" src="${imagesToDisplay[data.id-1]}" alt="${data.id}">`;
    imagesAlreadyDisplayed.push(data.id);
    
    //Gère le zoom et le dezoom de l'image
    //Serait mieux de gérer ça en dehors de la const onGetImage()
    document.getElementById("displayedImage").addEventListener('mouseleave', () =>{
      document.getElementById("displayedImage").style.width = "50%";
      console.log("Dezoom");
    });
    document.getElementById("displayedImage").addEventListener('mouseenter', () =>{
      document.getElementById("displayedImage").style.width = "70%";
      console.log("Zoom");
    });

    let bottomDash = `<h1><span>`;  
    for(let i=0; i<data.wordToFind.length; i++){
      bottomDash += ` _ `;
    }
    bottomDash += `</span></h1>`;

    document.getElementById("bottomDash").innerHTML = bottomDash;

    onCheckAnswer(data);
  }
};

const onCheckAnswer = (data) => {
  document.getElementById("answerForm").innerHTML =`
  <form>
    <input class="form-control" type="text" name="answer" id="answer" placeholder="Entrez la réponse" autocomplete="off"/>
    <input class="buttonHP" type="submit" value="Envoyer" />
  </form>`;

  document.getElementById("answer").focus();//Pour que le curseur aille directement dans le formulaire
  let answerForm = document.querySelector("form");

  answerForm.addEventListener("submit",(event) =>{
    event.preventDefault();
    let answer = answerForm.elements[0].value;
      
    if(answer === data.wordToFind){
      document.getElementById("state").innerHTML = `<h1 style="color:green">Bonne réponse !</h1>`;
      console.log("Bien joué le mot était", data.wordToFind);
      actualRound++;
      correctAnswers++;
      setTimeout(onCallGame,1000); //Pour afficher pdt 1 sec qu'on a trouvé la bonne rep
      //onCallGame();
    }else{
      answerForm.elements[0].value = ``; //Reset l'input lorsque l'utilisateur à entre une mauvaise rep
      document.getElementById("state").innerHTML = `<h1 style="color:red">Mauvaise réponse !</h1>`;
    }
    console.log("Réponse : " + answer);
  });
  if(isGameFinished){ //Si la partie est finie, on remplace la inGamePage par l'html présent dans la const onEndGame()
    clearInterval(myVarForTimer);
    page.innerHTML = endGamePage;
  }
}

const onEndGame = (nbRound) => {
  console.log(correctAnswers + "/" + nbRound);
  endGamePage = 
  `<div id="centerPage">
    <img id="logo2" src="${logo}" alt="logo GuessIt">
    <h1>Guess It</h1>
    <h4>Jeu multijoueur</h4>
    <div id="firstSquare">
      <div id="secondSquare">
        <h1>Partie terminée</h1>
        <h1>${correctAnswers}/${nbRound} réponses correctes </h1>
      </div><!-- div id=secondSquare -->    
    </div><!-- div id=firstSquare -->
  </div><!-- div id=centerPage -->`;0
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