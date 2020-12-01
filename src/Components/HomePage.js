//import { setLayout } from "../utils/render.js";
import logo from "../images/guessItLogo.png";
import { RedirectUrl } from "./Router.js";
import anime from 'animejs/lib/anime.es.js';


let homePage = `

<div id="centerPage">
  <!-- <img id="logo" src="${logo}" alt="logo GuessIt"> -->
  <div class="container">
    <div class="squares"></div>
    <div class="squares"></div>
  </div>
    <div class="container">
    <div class="squares"></div>
  <div class="squares"></div>
  </div>
  <h1>GUESS IT</h1>
  <h4>Multiplayer game</h4>
  <div id="firstPartHomePage">
    <div id="secondPartHomePage">
      <div id="createGameForm">
        <form action="/createGame">
          <input class="form-control" type="text" name="pseudo" id="pseudo" placeholder="pseudo"/>
          <input class="buttonHP" type="submit" value="Create Game" />
        </form>
      </div>
      <div id="joinGameForm">
        <form>
          <input class="form-control" type="text" name="link" id="link" placeholder="Invitation Link"/>
          <input class="buttonJoin" type="submit" value="Join Game" />
        </form>
      </div>
    </div>
  </div>
</div>
`;

let page = document.querySelector("#page");
const HomePage = async () => {

  page.innerHTML = homePage;

  animeHomePage();
  // let createGameForm = document.getElementById("createGameForm");
  // createGameForm.addEventListener("submit", onCreateGame);
  //let joinGameForm = document.getElementsById("joinGameForm");
  //joinGameForm.addEventListener("submit", onJoinGame);
};

const onCreateGame = (e) => {
  e.preventDefault();
  RedirectUrl("/createGame");
}

const onJoinGame = (e) => {
  e.preventDefault();
  RedirectUrl("/waitingRoom");
}

const animeHomePage = () =>{
  /**
   *  Animation with AnimeJS
   */
  let squaresAnim = anime({
    targets: '.squares',
    rotate: {
      value: 360,
      duration: 1000,
      easing: 'easeInOutSine'
    },
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},
      {value: 1, easing: 'easeInOutQuad', duration: 750}
    ],
    delay: anime.stagger(200, {grid: [10, 2], from: 'center'})
  });
  //document.querySelector('.squares').addEventListener('mouseover',() =>{squaresAnim.play();});
  document.querySelector('.squares').onclick = squaresAnim.restart;

  anime({
    targets: 'h1',
    rotate: {
      value: 1440,
      duration: 1850,
      easing: 'easeInOutSine'
    }
  })

  const buttonHP = document.querySelector('.buttonHP');
  const mouseHoverAnimation = () =>{
    anime({
      targets: buttonHP,
      widht: '100%',
      scale: {
        delay: 100,
        value: 1.02
      },
      duration: 1500
    });
  }
  const mouseOutAnimation = () =>{
    anime({
      targets: buttonHP,
      widht: '50%',
      scale: {
        delay: 100,
        value: 1
      },
      duration: 1500
    });
  }
  buttonHP.addEventListener('mouseover', mouseHoverAnimation);
  buttonHP.addEventListener('mouseout', mouseOutAnimation);

  const buttonJoin = document.querySelector('.buttonJoin');
  const mouseOverAnimation = () =>{
    anime({
      targets: buttonJoin,
      widht: '100%',
      scale: {
        delay: 100,
        value: 1.02
      },
      duration: 1500
    });
  }
  const mouseOverAnimationJoin = () =>{
    anime({
      targets: buttonJoin,
      widht: '50%',
      scale: {
        delay: 100,
        value: 1
      },
      duration: 1500
    });
  }
  buttonJoin.addEventListener('mouseover', mouseOverAnimation);
  buttonJoin.addEventListener('mouseout', mouseOverAnimationJoin);
  /*
  let animeLogo = anime({
    targets: document.getElementById('logo'),
    rotate: '2turn',
    duration: 800,
    autoplay: false
  });
  document.getElementById('logo').addEventListener('mouseover', () => { animeLogo.play();})
  */


  /**
   *  End of animation with AnimeJS
   */
}

export default HomePage;