import * as io from 'socket.io-client';

const socket = io('http://localhost:3000');

let chatRoomPage =`
<form id='chat-form'>
    <input required type="text" class="form-control" id="msg" name="msg" min="5" max="15" placeholder="Enter message">
    <button>Send</button>
</form>
<div class= "chat-message">
    <div class="message">
    <p class="text">Salut tous le monde </p>
    </div>

</div

`;



let page = document.querySelector("#page");


const ChatRoomPage = async () => {
    page.innerHTML = chatRoomPage;

    let chatForm = document.getElementById('chat-form');
    chatForm.addEventListener('submit', onSubmitMess);
};

const onSubmitMess = (e) =>{
    e.preventDefault()
    const message = e.target.elements.msg.value;

    //emit message to server
    socket.emit('chat-message',message);

    //clear input
    e.target.elements.msg.value = '';
}

//socket client
socket.on('connect', () => { // Quand la connexion est établie
    console.log('Socket Client ID:' + socket.id); // 'G5p5...'
    console.log('Socket Connection Established');
});

//message From server
socket.on('message', msg => {
    console.log(msg);
    outputMessage(msg); 
})

socket.on('broadcast', (arg) => {
    console.log('From socket server, broadcast:' + arg);
});

function outputMessage(mess){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="text">
                    ${mess}</p>`;
    document.querySelector('.chat-message').appendChild(div);                
}

export default ChatRoomPage;