import {
    canvas, context,
    height,
    width,
    handleEntitiesMovement
} from "./components.js";

import {
    player1,
    player2,
    shootBall1,
    shootBall2,
    setShootBall1ToNull,
    setShootBall2ToNull
} from "./event.js";

import { Ball, balls } from "./enemies.js";
import { Player, handlePlayerMovement, playerinGoal, isColliding } from "./player.js";

function drawPoints() {
    context.fillStyle = "white";
    context.font = "48px serif";
    context.textAlign = "center";
    context.fillText(player1.score, (canvas.width / 2) - 100, canvas.height - 70);

    context.fillStyle = "white";
    context.font = "48px serif";
    context.textAlign = "center";
    context.fillText(player2.score, (canvas.width / 2) + 100, canvas.height - 70);
}

function tickShootBall(shootBall, deltaTime) {
    if (shootBall === null) {

        return false;
    }

    if (shootBall2 !== null) {
        if (isColliding(shootBall2, player1)) {

            player1.position.y = 700;

            shootBall2.position.y = undefined;
            shootBall2.position.x = undefined;
        }
    }

    if (shootBall1 !== null) {
        if (isColliding(shootBall1, player2)) {

            player2.position.y = 700

            shootBall1.position.y = undefined;
            shootBall1.position.x = undefined;
        }
    }
    handleEntitiesMovement(shootBall, deltaTime);
    shootBall.draw();
    return Date.now() > (shootBall.startTime + 3000);
}

let tickTime = 0;
let tickTime2 = 0;
let lastTick = Date.now();

export function tick() {
    let currentTick = Date.now();
    let deltaTime = (currentTick - lastTick) / 1000;
    lastTick = currentTick;

    tickTime2 += deltaTime;
    tickTime += deltaTime;

    console.log(tickTime)

    if (tickTime >= 0.5) {
        tickTime = 0;
        let position = { x: 0, y: Math.random() * height - 200 };
        let velocity = { x: 200, y: 0 };
        balls.push(new Ball(position, velocity))

    }

    if (tickTime2 >= 0.5) {
        tickTime2 = 0;
        let position = { x: width, y: Math.random() * height - 200 };
        let velocity = { x: -200, y: 0 };
        balls.push(new Ball(position, velocity))
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];

        ball.move(deltaTime);
        ball.draw();
        ball.removeBall();
        if (isColliding(ball, player1)) {
            player1.position.y = 700;
            balls.splice(i, 1);
        }

        if (isColliding(ball, player2)) {
            player2.position.y = 700;
            balls.splice(i, 1);
        }
    }

    player1.draw();
    player2.draw();


    if (tickShootBall(shootBall1, deltaTime)) {
        setShootBall1ToNull();
    }

    if (tickShootBall(shootBall2, deltaTime)) {
        setShootBall2ToNull();
    }

    drawPoints();
    playerinGoal(player1);
    playerinGoal(player2);

    handlePlayerMovement(player1, deltaTime);
    handlePlayerMovement(player2, deltaTime);

    requestAnimationFrame(tick);
}