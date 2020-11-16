import { setLayout } from "./utils/render.js";
import {Router} from "./Components/Router.js";
import Navbar from "./Components/Navbar.js";
import ThemeDropDown from "./Components/ThemeDropDown.js";
/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

const HEADER_TITLE = "JavaScript & Node.js full course";
const FOOTER_TEXT = "Happy learning : )";

Navbar();

ThemeDropDown();

Router();


setLayout(undefined, HEADER_TITLE, FOOTER_TEXT);
