import { RedirectUrl } from "./Router.js";
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
import p14 from "../images/14.jpg";
import p15 from "../images/15.jpg";
import p16 from "../images/16.jpg";
import p17 from "../images/17.jpg";
import p18 from "../images/18.jpg";
import p19 from "../images/19.jpg";
import p20 from "../images/20.jpg";
import p21 from "../images/21.jpg";
import p22 from "../images/22.jpg";
import p23 from "../images/23.jpg";
import p24 from "../images/24.jpg";
import p25 from "../images/25.jpg";
import p26 from "../images/26.jpg";
import p27 from "../images/27.jpg";


//Récupère le pseudo dans l'url
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
        <h2 id="users-title">JOUEURS</h2>
        <br>
        <ul id="users"></ul>
    </div>
    <div class="container-ingame">
        <div id="round"></div>
        <div id="centerPage">
            <div id="waiting"></div>
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
                <input id="msg" type="text" placeholder="Entrez le message" required autocomplete="off" />
            </form>
        </div>
    </div>
</div>`;

let page = document.querySelector("#page");
//Liste qui contient tous les import des images à afficher
let imagesToDisplay = new Array(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27);
let endGamePage;
let actualRound;
let myVarForTimer;
let timer;
let dataGame;
let dataImage;

const socket = io('http://localhost:3000');

const InGamePage = () => {

  page.innerHTML = inGamePage;

  let chatForm = document.getElementById('chat-form');
  chatForm.addEventListener('submit', onSubmitMess);

  //Appel APi pour récupérer les données de la partie et lancer la WaitingRoom
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
    .then((data) => OnGameSettings(data))
    .catch((err) => onError(err));

};

//Permet d'envoyer le message du client au serveur
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



//Connecte le client
socket.on('connect', () => { // Quand la connexion est établie
  console.log('Socket Client ID:' + socket.id); // 'G5p5...'
  console.log('Socket Connection Established');
  socket.emit(socket.id);
});

//Envoie les messages normaux à tous les joueurs
function outputMessage(mess) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="text">
  <span class="meta">${mess.username} : </span>
  ${mess.text}</p>`;

  document.querySelector('.chat-messages').appendChild(div);
}

//Permet d'afficher aux autres joueurs quand le client actuel a trouvé la bonne rep
function outputGoodResponse(mess) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="text">
  <span class="meta">${mess.username} : </span>
  a trouvé la bonne réponse</p>`

  document.querySelector('.chat-messages').appendChild(div);
}

//Affiche la liste des joueurs
let outputList = (users) => {
  const userList = document.getElementById('users');
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}

//Gère la récupèration d'image
socket.on('get-image', ({ image }) => {
  //Récupère les données de l'image
  dataImage = image;
  //On affiche ensuite l'image au client
  onDisplayImage(image);
});

//Gère le timer
socket.on('reset-timer', () => {
  timer = dataGame.roundTime;
  clearInterval(myVarForTimer);//Je clear l'interval pour éviter qu'il y ait plusieurs timers lorsqu'une réponse est correcte
  myVarForTimer = setInterval(myTimer, 1000);

  document.getElementById("timer").innerHTML = `<h1>TEMPS RESTANT : ${timer}</h1>`;//Je le mets avant la fonction pour qu'il soit mis dans l'html
  function myTimer() { //Fonction pour actualiser le timer à chaque seconde
    document.getElementById("timer").innerHTML = `<h1>TEMPS RESTANT : ${timer}</h1>`;
    timer--;
    if (timer < 0) { //Si le timer est écoulé
      console.log("Temps écoulé");
      //Crée un msg pour dire que personne n'a trouvé la bonne rep
      let messTempsEcoule = {
        username:"",
        text: "Personne n'a trouvé la bonne réponse"
      }
      //Dit au serveur qu'il doit mettre dans le chat le messTempsEcoule
      socket.emit('elapse-time', messTempsEcoule);
      clearInterval(myVarForTimer);
      onGameStarted();
    }
  }
});

//Gère l'incrémentation de round et l'actualisation du round
socket.on('increment-round', () => {
  actualRound++;
  document.getElementById("round").innerHTML = `<h1>ROUND : ${actualRound}/${dataGame.nbRound}</h1>`;
  if (actualRound > dataGame.nbRound) { //Si la partie est finie
    socket.emit('launch-endGame');
  }
});

//Gère la waiting room
socket.on('userList', ({ users }) => {
  //Affiche le nb de joueurs qui doivent rejoindre et les params de la partie
  document.getElementById('waiting').innerHTML = `
   <h1>En attente d'autres joueurs</h1>
   <h1>${users.length}/${dataGame.nbPlayer}</h1>
   <br>
   <h3>Nombre de rounds de la partie : ${dataGame.nbRound}</h3>
   <h3>Temps pour chaque round : ${dataGame.roundTime} secondes</h3>
   `;

  //Si assez de joueurs on lance la game
  if (users.length == dataGame.nbPlayer) {
    socket.emit('launch-game');
    //On réinitialise la partie html de la waiting room
    document.getElementById('waiting').innerHTML = ``;
    console.log("La partie peut commencer");
    //On actualise actualRound comme ça pour que le résultat soit tjrs =1
    actualRound = 1 - users.length;
    onGameStarted();
  }
  outputList(users);
});

//Gère la fin de partie
socket.on('end-game', (users) => {
  onEndGame(users);
  console.log("gameIsFinished");

  clearInterval(myVarForTimer);
  page.innerHTML = endGamePage;
});

//Permet au client de récupérer les données de la partie via un appel API
const OnGameSettings = (data) => {
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

  //Affiche l'image au client
  document.getElementById("image").innerHTML = `<img style="width:50%" id="displayedImage" src="${imagesToDisplay[data.id - 1]}" alt="${data.id}">`;

  //Gère le zoom et le dezoom de l'image
  document.getElementById("displayedImage").addEventListener('mouseleave', () => {
    document.getElementById("displayedImage").style.width = "50%";
    console.log("Dezoom");
  });
  document.getElementById("displayedImage").addEventListener('mouseenter', () => {
    document.getElementById("displayedImage").style.width = "60%";
    console.log("Zoom");
  });
  
  //Ajoute les tirets du bas
  let bottomDash = `<h1><span>`;
  for (let i = 0; i < data.wordToFind.length; i++) {
    bottomDash += ` _ `;
  }
  bottomDash += `</span></h1>`;

  document.getElementById("bottomDash").innerHTML = bottomDash;

};

//Gère les messages et les bonnes réponses
socket.on('message', msg => {
  let chatMessages = document.querySelector('.chat-messages');
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
    setTimeout(onGameStarted, 1000);//Pour afficher pdt 1 sec qu'on a trouvé la bonne rep puis on relance un round
    outputMessage(msg);
    //Si personne n'a trouvé la bonne reponse
  } else {
    outputMessage(msg);
  }
  //Permet laisser les derniers messages vers le bas
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Classement final du jeu
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
  //Tri fonctionnel
  users.sort((a, b) => b.correctAnswers - a.correctAnswers);
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

export default InGamePage;