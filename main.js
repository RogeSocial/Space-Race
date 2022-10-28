import {
    handlePlayer1KeyUp,
    handlePlayer2KeyUp,
    handlePlayer1KeyDown,
    handlePlayer2KeyDown,
    
} from "./event.js";

import { tick } from "./game.js"


window.addEventListener('keypress', handlePlayer1KeyDown);
window.addEventListener('keypress', handlePlayer2KeyDown);
window.addEventListener('keyup', handlePlayer1KeyUp);
window.addEventListener('keyup', handlePlayer2KeyUp);

tick();

console.log("Easter egg");