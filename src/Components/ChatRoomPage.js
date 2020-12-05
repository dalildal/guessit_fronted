import * as io from 'socket.io-client';
import * as qs from 'qs';

/*const { pseudo } = qs.parse(location.search, {
  ignoreQueryPrefix: true
});*/

let chatRoomPage = `
<div class="chat-container">
  <header class="chat-header">
    <h1><i class="fas fa-smile"></i> GuessIt</h1>
    <a href="index.html" class="btn">Leave Room</a>
  </header>
  <main class="chat-main">
    <div class="chat-sidebar">
      <h3><i class="fas fa-comments"></i> Room Name:</h3>
      <h2 id="room-name">JavaScript</h2>
      <h3><i class="fas fa-users"></i> Users</h3>
      <ul id="users"></ul>
    </div>
    <div class="chat-images"></div>
    <div class="chat-messages"></div>
  </main>
  <div class="chat-form-container">
    <form id="chat-form">
      <input id="msg" type="text" placeholder="Enter Message" required autocomplete="off"/>
      <button class="btn"><i class="fas fa-paper-plane"></i> Send</button>
    </form>
  </div>
</div>`;



let page = document.querySelector("#page");
// let socket = null;
//const socket = io('http://localhost:3000');

const ChatRoomPage = async () => {

  page.innerHTML = chatRoomPage;

  //let chatForm = document.getElementById('chat-form');
  //chatForm.addEventListener('submit', onSubmitMess);
};

/*const onSubmitMess = (e) =>{
  e.preventDefault()
  const message = e.target.elements.msg.value;
  
  //emit message to server
  socket.emit('chat-message',message);
  
  //clear input
  e.target.elements.msg.value = '';
}

//user join room
socket.emit('joinRoom',{pseudo});

// show the userList
socket.on('userList' , ({users}) =>{
  outputList(users);
})

//socket client
socket.on('connect', () => { // Quand la connexion est établie
  console.log('Socket Client ID:' + socket.id); // 'G5p5...'
  console.log('Socket Connection Established');
  socket.emit(socket.id);
});

//message From server
socket.on('message', msg => {
  console.log(msg);
  outputMessage(msg); 
})

socket.on('broadcast', arg => {
  console.log('From socket server, broadcast:' + arg);
  outputMessage(arg);
});

function outputMessage(mess){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="text">
  <span class="meta">${mess.username} : </span>
  ${mess.text}</p>`
  
  document.querySelector('.chat-messages').appendChild(div);                
}

function outputList(users){
  const userList = document.getElementById('users');
  console.log(users);
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}*/

export default ChatRoomPage;