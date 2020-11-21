
let waitingRoomPage = `
<div id="centerPage">
  <h1>waiting room</h1>
</div>
`;

let page = document.querySelector("#page");

const WaitingRoomPage = async () => {

  page.innerHTML = waitingRoomPage;

};

export default WaitingRoomPage;
