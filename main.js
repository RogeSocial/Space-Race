const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let height = canvas.height;
let width = canvas.width;
let asteroids = [];
let balls = [];

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
}

class Velocity {
    constructor(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
}

class Entity {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
    draw() {

    }
}
class Keys {
    constructor() {
        this.up = false;
        this.down = false;
    }
}

class Player extends Entity {
    constructor(position, velocity) {
        super(position, velocity);
        this.score = 0;
        this.radius = 20;
        this.color = "red";
        this.keys = new Keys();
        this.speed = 300;
    }
    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }


}

class Ball extends Entity {
    constructor(position, velocity) {
        super(position, velocity);

        this.radius = 15;
        this.color = "white";
    }

    move() {
        this.position.x += this.velocity.x / 10;
        this.position.y += this.velocity.y / 10;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}

let player1 = new Player(new Position(200, 700), new Velocity(0, 0));
let player2 = new Player(new Position(600, 700), new Velocity(0, 0));
let newBall = new Ball()

function handleEntitiesMovement(entity, deltaTime) {

    entity.position.x += entity.velocity.dx * deltaTime;
    entity.position.y += entity.velocity.dy * deltaTime;
}

function isEntityOutside(entity) {
    return (entity.position.x < -entity.radius ||
        entity.position.x > width + entity.radius ||
        entity.position.y < -entity.radius ||
        entity.position.y > height + entity.radius);
}

function isColliding(ball, player) {
    let cdx = Math.abs(ball.position.x - player.position.x);
    let cdy = Math.abs(ball.position.y - player.position.y);

    if (cdx > (player.width / 2 + ball.radius)) { return false; }
    if (cdy > (player.height / 2 + ball.radius)) { return false; }

    if (cdx <= player.width / 2) { return true; }
    if (cdy <= player.height / 2) { return true; }

    let distSquared = ((cdx - player.width / 2) ** 2) + ((cdy - player.height / 2) ** 2);
    return distSquared <= ball.radius ** 2;
}

function handlePlayer1KeyDown(event) {
    if (event.repeat) return;

    if (event.key == 'w') {
        player1.keys.up = true;
    } else if (event.key == 's') {
        player1.keys.down = true;
    }
}

function handlePlayer2KeyDown(event) {
    if (event.repeat) return;

    if (event.key == 'o') {
        player2.keys.up = true;
    } else if (event.key == 'l') {
        player2.keys.down = true;
    }
}

function handlePlayer1KeyUp(event) {
    if (event.key == 'w') {
        player1.keys.up = false;
    } else if (event.key == 's') {
        player1.keys.down = false;
    }
}

function handlePlayer2KeyUp(event) {
    if (event.key == 'o') {
        player2.keys.up = false;
    } else if (event.key == 'l') {
        player2.keys.down = false;
    }
}
window.addEventListener('keypress', handlePlayer1KeyDown);
window.addEventListener('keypress', handlePlayer2KeyDown);
window.addEventListener('keyup', handlePlayer1KeyUp);
window.addEventListener('keyup', handlePlayer2KeyUp);

function handlePlayerMovement(player1, deltaTime) {
    let speed = player1.speed;

    if (player1.keys.up && player1.position.y > player1.radius) {
        player1.position.y -= speed * deltaTime;
    }
    if (player1.keys.down && player1.position.y < height - player1.radius) {
        player1.position.y += speed * deltaTime;
    }
}



/* function tickBalls(deltaTime) {
    for (let i = 0; i < balls.length; i++) {
        let ball = newBall
        ball = balls[i];

        ball.draw();
        
        handleEntitiesMovement(ball, deltaTime);
        if (isEntityOutside(ball)) {
            balls.splice(i, 1);
            continue;
        }
        if (isColliding(ball, player1)) {
            player1.position.y = 100;
        }
        if (isColliding(ball, player2)) {
            player2.position.y = 100;
        }
    }
}*/

let tickCount = 0;
let lastTick = Date.now();

function tick() {
    let currentTick = Date.now();
    let deltaTime = (currentTick - lastTick) / 1000;
    lastTick = currentTick;

    tickCount++;
    if (tickCount >= 50) {
        tickCount = 0;
        let position = {x: 0, y: Math.random() * height };
        let velocity = {x: 20, y: 0};
        let radius = 15;
        balls.push(new Ball(position, velocity))
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    // tickBalls(deltaTime);
    
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        
        ball.move();
        ball.draw();
    }

    player1.draw();
    player2.draw();

    /*if (tickCount % 200 === 0) {
        let ball = new Ball(new Position(10, 10), new Velocity(10, 0))
        balls.push(ball);
    }*/

    handlePlayerMovement(player1, deltaTime);
    handlePlayerMovement(player2, deltaTime);

    requestAnimationFrame(tick);
}

function generateNumberBetween(min, max, fraction) {
    if (fraction) {
        return Math.random() * (max - min) + min;
    } else {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

function generateEnemyPosition() {
    let side = generateNumberBetween(1, 2, false);

    if (side === 1) { // vänster sida
        return new Position(generateNumberBetween(0, height, true), 0)

    } else if (side === 2) { // höger sida
        return new Position(width, generateNumberBetween(0, height, true), 0)

    }

}

tick();

console.log("Easter egg");