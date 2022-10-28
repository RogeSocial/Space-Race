import { Entity } from "./entities.js";
import {
    
    context,
    height,
    
} from "./components.js";


class Keys {
    constructor() {
        this.up = false;
        this.down = false;
        this.shoot = false;
    }
}

export class Player extends Entity {
    constructor(position, velocity) {
        super(position, velocity);
        this.score = 0;
        this.radius = 50;
        this.color = "red";
        this.keys = new Keys();
        this.speed = 300;
        this.width = 50;
        this.height = 100;
        this.startTime = Date.now;
    }

    draw() {
        let image = new Image();
        image.src = 'images/rocket.png'
        context.drawImage(image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height)
    }
}

export function handlePlayerMovement(player1, deltaTime) {
    let speed = player1.speed;

    if (player1.keys.up && player1.position.y > player1.radius) {
        player1.position.y -= speed * deltaTime;
    }
    if (player1.keys.down && player1.position.y < height - player1.radius) {
        player1.position.y += speed * deltaTime;
    }
}

export function playerinGoal(player) {
    if (player.position.y < (player.height / 2)) {
        player.score++;

        return player.position.y = 700;
    }
}

export function isColliding(ball, player) {
    let cdx = Math.abs(ball.position.x - player.position.x);
    let cdy = Math.abs(ball.position.y - player.position.y);

    if (cdx > (player.width / 2 + ball.radius)) { return false; }
    if (cdy > (player.height / 2 + ball.radius)) { return false; }

    if (cdx <= player.width / 2) { return true; }
    if (cdy <= player.height / 2) { return true; }

    let distSquared = ((cdx - player.width / 2) ** 2) + ((cdy - player.height / 2) ** 2);
    return distSquared <= ball.radius ** 2;
}