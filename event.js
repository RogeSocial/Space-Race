import { ShootBall } from "./enemies.js";
import { Position, Velocity } from "./components.js";
import { Player } from "./player.js"

export let player1 = new Player(new Position(200, 700), new Velocity(0, 0));
export let player2 = new Player(new Position(600, 700), new Velocity(0, 0));
export let shootBall1 = null;
export let shootBall2 = null;

export function handlePlayer1KeyDown(event) {
    if (event.repeat) return;

    if (event.key == 'w') {
        player1.keys.up = true;
    } else if (event.key == 's') {
        player1.keys.down = true;
    }
}

export function setShootBall1ToNull() {
    shootBall1 = null;
}

export function setShootBall2ToNull() {
    shootBall2 = null;
}

export function handlePlayer2KeyDown(event) {
    if (event.repeat) return;

    if (event.key == 'o') {
        player2.keys.up = true;
    } else if (event.key == 'l') {
        player2.keys.down = true;
    }
}

export function handlePlayer1KeyUp(event) {
    if (event.key === 'w') {
        player1.keys.up = false;
    } else if (event.key === 's') {
        player1.keys.down = false;
    } else if (event.key === 'e') {
        if (shootBall1 !== null) {
            return;
        }
        let velocity = new Velocity(10, 0);
        velocity.dx = 1000;
       
        let position = new Position(player1.position.x, player1.position.y);
        shootBall1 = new ShootBall(position, velocity);
    }
}

export function handlePlayer2KeyUp(event) {
    if (event.key == 'o') {
        player2.keys.up = false;
    } else if (event.key == 'l') {
        player2.keys.down = false;
    } else if (event.key == 'i') {
        if (shootBall2 !== null) {
            return;
        }
        let velocity = new Velocity(-10, 0);
        velocity.dx = -1000;

        let position = new Position(player2.position.x, player2.position.y)
        shootBall2 = new ShootBall(position, velocity)

    }
}