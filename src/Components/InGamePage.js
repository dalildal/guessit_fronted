
import { RedirectUrl } from "./Router.js";
import logo from "../images/guessItLogo.png";
import * as io from 'socket.io-client';
import * as qs from 'qs';
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

//récupère le pseudo dans l'url
const { pseudo } = qs.parse(location.search, {
  ignoreQueryPrefix: true
});

let inGamePage = `
<div class="logo-ingame">
    <div class="container">
        <div class="squares-ingame"></div>
        <div class="squares-ingame"></div>
    </div>
    <div class="container">
        <div class="squares-ingame"></div>
        <div class="squares-ingame"></div>
    </div>
</div>

<div class="container-game">
    <div class="container-menu">
        <h2 id="users-title">USERS</h2>
        <br>
        <ul id="users"></ul>
    </div>
    <div class="container-ingame">
        <div id="round"></div>
        <div id="centerPage">
            <div id="waiting"></div>
            <div id="hey"></div>
            <div id="image"></div>
            <div id="bottomDash"></div>
            <div id="state"></div>
            <div id="answerForm"></div>
        </div><!-- div id=centerPage -->
        <div class="container-timer">
            <h1 id="timer"></h1>
        </div>
    </div>
    <div class="container-chat">
        <div class="chat-messages"></div>
        <div class="chat-form">
            <form id="chat-form">
                <input id="msg" type="text" placeholder="Enter Message" required autocomplete="off" />
                <!-- <button class="btn"><i class="fas fa-paper-plane"></i> Send</button> -->
            </form>
        </div>
    </div>
</div>`;

let page = document.querySelector("#page");
let imagesToDisplay = new Array(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13);
let endGamePage;
let actualRound;
let myVarForTimer;
let timer;
let dataGame;
let dataImage;
let chatMessages = document.querySelector('.chat-message');

const socket = io('http://localhost:3000');

const InGamePage = () => {

  page.innerHTML = inGamePage;

  let chatForm = document.getElementById('chat-form');
  chatForm.addEventListener('submit', onSubmitMess);

  //Appel APi pour récupérer les données de la partie et lancer la WaitingRoom
  onCallGame();

};


const onSubmitMess = (e) => {
  e.preventDefault()
  const message = e.target.elements.msg.value;

  //emit message to server
  socket.emit('chat-message', message);

  //clear input
  e.target.elements.msg.value = '';
}

//user join room
socket.emit('joinRoom', { pseudo });



//socket client
socket.on('connect', () => { // Quand la connexion est établie
  console.log('Socket Client ID:' + socket.id); // 'G5p5...'
  console.log('Socket Connection Established');
  socket.emit(socket.id);
});


function outputMessage(mess) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="text">
  <span class="meta">${mess.username} : </span>
  ${mess.text}</p>`;

  document.querySelector('.chat-messages').appendChild(div);
}

function outputGoodResponse(mess) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="text">
  <span class="meta">${mess.username} : </span>
  a trouvé la bonne réponse</p>`

  document.querySelector('.chat-messages').appendChild(div);
}

let outputList = (users) => {
  const userList = document.getElementById('users');
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}

//Gère la récupèration d'image
socket.on('get-image', ({ image }) => {
  console.log("Image à trouver :", image.wordToFind);
  dataImage = image;
  onDisplayImage(image);
});

//Gère le timer
socket.on('reset-timer', () => {
  timer = dataGame.roundTime;
  console.log("timer :", dataGame.roundTime);
  clearInterval(myVarForTimer);//Je clear l'interval pour éviter qu'il y ait plusieurs timers lorsqu'une réponse est correcte
  myVarForTimer = setInterval(myTimer, 1000);

  document.getElementById("timer").innerHTML = `<h1>TEMPS RESTANT : ${timer}</h1>`;//Je le mets avant la fonction pour qu'il soit mis dans l'html
  function myTimer() { //Fonction pour actualiser le timer à chaque seconde
    document.getElementById("timer").innerHTML = `<h1>TEMPS RESTANT : ${timer}</h1>`;
    timer--;
    if (timer < 0) { //Si le timer est écoulé
      console.log("Temps écoulé");
      clearInterval(myVarForTimer);
      onGameStarted();
    }
  }
});

//Gère l'incrémentation de round et l'actualisation du round
socket.on('increment-round', () => {
  console.log("actualRound : ", actualRound);
  actualRound++;
  document.getElementById("round").innerHTML = `<h1>ROUND : ${actualRound}/${dataGame.nbRound}</h1>`;
  if (actualRound > dataGame.nbRound) { //Si la partie est finie
    socket.emit('launch-endGame');
  }
});

//Gère la fin de partie
socket.on('end-game', (users) => {
  onEndGame(users);
  console.log("gameIsFinished");

  clearInterval(myVarForTimer);
  page.innerHTML = endGamePage;
});

//Gère la waiting room
socket.on('userList', ({ users }) => {
  document.getElementById('waiting').innerHTML = `
   <h1>En attente d'autres joueurs</h1>
   <h1>${users.length}/${dataGame.nbPlayer}</h1>
   <br>
   <h3>Nombre de round de la partie : ${dataGame.nbRound}</h3>
   <h3>Temps pour chaque round : ${dataGame.roundTime} secondes</h3>
   `;

  //Si assez de joueurs on lance la game
  if (users.length == dataGame.nbPlayer) {
    socket.emit('launch-game');
    document.getElementById('waiting').innerHTML = ``;
    console.log("La partie peut commencer");
    //On actualise actualRound comme ça pour que le résultat soit tjrs =1
    actualRound = 1 - users.length;
    onGameStarted();
  }
  outputList(users);
});

const onGameSettings2 = (data) => {
  if (!data) return;
  dataGame = data;
};

const onGameStarted = () => {
  document.getElementById("state").innerHTML = ``;//On remet l'état à "zéro"

  socket.emit('launch-timer');

  socket.emit('launch-round');

  //Continue la partie
  socket.emit('launch-image');

}


const onDisplayImage = (data) => {
  if (!data) return;

  document.getElementById("image").innerHTML = `<img style="width:50%" id="displayedImage" src="${imagesToDisplay[data.id - 1]}" alt="${data.id}">`;

  //Gère le zoom et le dezoom de l'image
  //Serait mieux de gérer ça en dehors de la const onGetImage()
  /* document.getElementById("displayedImage").addEventListener('mouseleave', () => {
     document.getElementById("displayedImage").style.width = "50%";
     console.log("Dezoom");
   });
   document.getElementById("displayedImage").addEventListener('mouseenter', () => {
     document.getElementById("displayedImage").style.width = "70%";
     console.log("Zoom");
   });
 */
  let bottomDash = `<h1><span>`;
  for (let i = 0; i < data.wordToFind.length; i++) {
    bottomDash += ` _ `;
  }
  bottomDash += `</span></h1>`;

  document.getElementById("bottomDash").innerHTML = bottomDash;

};

//Gère les messages et les bonnes réponses
socket.on('message', msg => {
  console.log("Message : ", msg);
  //Si un autre user a trouvé la bonne rep
  if (typeof dataImage !== 'undefined' && msg.text === dataImage.wordToFind && msg.username !== pseudo) {
    outputGoodResponse(msg);
    //Si le user actuel a entré une mauvaise réponse
  } else if (typeof dataImage !== 'undefined' && msg.text !== dataImage.wordToFind && msg.username === pseudo) {
    console.log("Mauvaise réponse");
    document.getElementById("state").innerHTML = `<h1 style="color:red">Mauvaise réponse !</h1>`;
    outputMessage(msg);
    //Si le user actuel a trouvé la bonne réponse 
  } else if (typeof dataImage !== 'undefined' && msg.text === dataImage.wordToFind && msg.username === pseudo) {
    console.log("Bonne réponse");
    document.getElementById("state").innerHTML = `<h1 style="color:green">Bonne réponse !</h1>`;
    //Increment le nbr de bonnes rep du user actuel
    socket.emit('launch-goodAnswer', socket.id);
    setTimeout(onGameStarted, 1000);//Pour afficher pdt 1 sec qu'on a trouvé la bonne rep
    outputMessage(msg);
    //Si personne n'a trouvé la bonne reponse
  } else {
    outputMessage(msg);
  }
  chatMessages.scrollTop = chatMessages.scrollHeight
})


const onEndGame = (users) => {

  endGamePage =
    `
    <div class="logo-ingame">
    <div class="container">
        <div class="squares-ingame"></div>
        <div class="squares-ingame"></div>
    </div>
    <div class="container">
        <div class="squares-ingame"></div>
        <div class="squares-ingame"></div>
    </div>
</div>

<div id="centerPage">
  <h1>GUESS IT</h1>
  <h4>Jeu multijoueur</h4>
  <div class="container-endgame1">
    <div class="container-endgame2">
      <h1>Partie terminée</h1>
      <h1>Classement : </h1>
`
  console.log("users non tries : ",users);
  //Tri non fonctionnel
  users.sort((a, b) => b.correctAnswers - a.correctAnswers);
  console.log("users tries : ",users);
  //Permet d'afficher le classement final
  let i = 1;
  users.forEach(element => {
    console.log(element.username, " ", element.correctAnswers);
    endGamePage += `<h1>${i} - ${element.username} : ${element.correctAnswers}</h1>
    `;
    i++;
  });

  endGamePage +=
    `</div><!-- div id=secondSquare -->    
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
    .then((data) => onGameSettings2(data))
    .catch((err) => onError(err));
}


export default InGamePage;