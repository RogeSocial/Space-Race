const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let scores = document.createElement("score");
let playerscore = canvas.appendChild(scores);

let height = canvas.height;
let width = canvas.width;
let halfWidth = width / 2;
let halfHeight = height / 2;

let shootBall = null;
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
        this.shoot = false;
    }
}

class Player extends Entity {
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

class Ball extends Entity {
    constructor(position, velocity) {
        super(position, velocity);

        this.radius = 10;
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

    removeBall() {
        if (this.position.x >= width || this.position.x <= 0) {
            balls.splice([], 1)
        }
        return this.removeBall;
    }

}
class ShootBall extends Ball {
    constructor(position, velocity) {
        super(position, velocity);
        this.color = "red";
        this.stroke = "darkred";
        this.startTime = Date.now();
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

    removeBall() {
        if (this.position.x >= width || this.position.x <= 0) {
            balls.splice([], 1)
        }
        return this.removeBall;
    }

    // shoot() {
    //     if (player1.keys.shoot) {
    //         this.velocity.dx += 20;
    //         if (tickShootBall(shootBall, deltaTime)){
    //             shootBall = null;
    //         }
    //     }

    //     if (player2.keys.shoot) {
    //         this.velocity.dx -= 20;
    //         if(tickShootBall(shootBall, deltaTime)){
    //             shootBall = null;
    //         }
    //     }
    // }

}

let shootBall1 = null;
let shootBall2 = null;
let player = new Player();
let player1 = new Player(new Position(200, 700), new Velocity(0, 0));
let player2 = new Player(new Position(600, 700), new Velocity(0, 0));
let newBall = new Ball();

function handleEntitiesMovement(entity, deltaTime) {

    entity.position.x += entity.velocity.dx * deltaTime;
    entity.position.y += entity.velocity.dy * deltaTime;
}

function tickShootBall(shootBall, deltaTime) {
    if (shootBall === null) {
        
        return false;

    }
    
    // shootBall.move();
    

    if (shootBall2 !== null){
    if (isColliding(shootBall2, player1)) {
        // console.log("Hello")
        
        player1.position.y = 700;
        // shootBall2 = null;
        shootBall2.position.y = undefined;
        shootBall2.position.x = undefined;
        
        
    }
}
if (shootBall1 !== null){
    if(isColliding(shootBall1, player2)){
        // console.log("Hello")
        player2.position.y = 700

        shootBall1.position.y = undefined;
        shootBall1.position.x = undefined;
        //shootBall1 = null;
        
        
    }
}
    handleEntitiesMovement(shootBall, deltaTime);
    shootBall.draw();
    return Date.now() > (shootBall.startTime + 3000);
}

function isEntityOutside(entity) {
    return (entity.position.x < -entity.radius ||
        entity.position.x > width + entity.radius ||
        entity.position.y < -entity.radius ||
        entity.position.y > height + entity.radius);

}
function playerinGoal(player) {
    if (player.position.y < (player.height / 2)) {
        player.score++;



        return player.position.y = 700;
    }
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
        console.log("test")
        let position = new Position(player1.position.x, player1.position.y);
        shootBall1 = new ShootBall(position, velocity);
    }
}

function handlePlayer2KeyUp(event) {
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

let tickCount = 0;
let tickCount2 = 0;
let lastTick = Date.now();

function tick() {
    let currentTick = Date.now();
    let deltaTime = (currentTick - lastTick) / 1000;
    lastTick = currentTick;
    tickCount2++;
    tickCount++;
    if (tickCount >= 50) {
        tickCount = 0;
        let position = { x: 0, y: Math.random() * height - 200 };
        let velocity = { x: 20, y: 0 };
        balls.push(new Ball(position, velocity))

    }

    if (tickCount2 >= 50) {
        tickCount2 = 0;
        let position = { x: width, y: Math.random() * height - 200 };
        let velocity = { x: -20, y: 0 };
        balls.push(new Ball(position, velocity))

    }

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];

        ball.move();
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
        shootBall1 = null;
    }
    if (tickShootBall(shootBall2, deltaTime)) {
        shootBall2 = null;
    }
    drawPoints();
    playerinGoal(player1);
    playerinGoal(player2);

    // shootBall.shoot();
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

    if (side === 1) {
        return new Position(generateNumberBetween(0, height, true), 0)

    } else if (side === 2) {
        return new Position(width, generateNumberBetween(0, height, true), 0)

    }

}

tick();

console.log("Easter egg");