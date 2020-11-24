import { setLayout } from "./utils/render.js";
import {Router} from "./Components/Router.js";
/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

import { io } from 'socket.io-client';
 
const socket = io('localhost:3000'); // Open a socket with the server listening on port 3000

socket.on('connect', () => { // Quand la connexion est établie
    console.log('Socket Client ID:' + socket.id); // 'G5p5...'
    console.log('Socket Connection Established');
});
 
socket.on('broadcast', (arg) => {
    console.log('From socket server, broadcast:' + arg);
});

const HEADER_TITLE = "JavaScript & Node.js full course";
const FOOTER_TEXT = "Happy learning : )";


Router();


setLayout(undefined, HEADER_TITLE, FOOTER_TEXT);
