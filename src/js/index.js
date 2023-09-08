import "../templates/index.html";
import "reset-css";
import "jq-fakeloader/dist/fakeLoader.min.css";
import "vex-js-fix/dist/css/vex.css";
import "vex-js-fix/dist/css/vex-theme-wireframe.css";
import "../sass/main.scss";
import "jq-fakeloader/dist/fakeLoader.min.js";
import greeting from "./greeting-section";
import { vocabulary } from "./vocabulary";
import { cards } from "./cards";
import appMenu from "./app-menu";
import fullscreen from "./fullscreen-mode";

$.fakeLoader({ timeToHide: "700", bgColor: "#000000", spinner: "spinner3" });

greeting();
fullscreen();
appMenu();
vocabulary();
cards();
