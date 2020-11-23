import { setLayout } from "./utils/render.js";
import {Router} from "./Components/Router.js";
/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

//import 'socket.io';
//import 'socket.io-client';
import  io  from 'socket.io-client';

//var socket = io();

//const HEADER_TITLE = "JavaScript & Node.js full course";
//const FOOTER_TEXT = "Happy learning : )";


Router();


//setLayout(undefined, HEADER_TITLE, FOOTER_TEXT);
