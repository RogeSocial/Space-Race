import { Entity } from "./entities.js";
import {
    canvas, context,
    height,
    width,
    halfHeight,
    halfWidth
} from "./components.js";

export let balls = [];

export class Ball extends Entity {
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

export class ShootBall extends Ball {
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

}
