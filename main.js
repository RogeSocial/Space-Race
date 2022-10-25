const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let height = canvas.height;
let width = canvas.width;
let image = new Image();
image.src = 'rocket.png';
let asteroids = [];

let balls = [];
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.deltaTime = 0;
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

class Player extends Entity {
    constructor(position, velocity) {
        super(position, velocity);
        this.score = 0;
    }
    draw() {
        context.beginPath();
        context.drawImage(image, 5, 5);
        context.fill()
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

let player1 = new Player(new Position(20, 200), new Velocity(0, 0));
let player2 = new Player(new Position(40, 200), new Velocity(0, 0));

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

 function tickBalls(){
     for(let i = 0; i < balls.length; i++){
            let ball = balls[i];

            draw(ball);
            handleEntitiesMovement(ball, deltaTime);
            if(isEntityOutside(ball)){
                balls.splice(i, 1);
                continue;
            }
}
 }

 let lastTick = Date.now();
function tick() {
    let currentTick = Date.now();
    let deltaTime = (currentTick - lastTick) / 1000;
    lastTick = currentTick;

    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(tick);
}

console.log("Easter egg");