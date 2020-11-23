
let inGamePage = `
<div id="centerPage">
  <h1>In game</h1>
</div>
`;

let page = document.querySelector("#page");

const InGamePage = async () => {

  page.innerHTML = inGamePage;

};

export default InGamePage;