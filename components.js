export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
}

export class Velocity {
    constructor(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
}

export function handleEntitiesMovement(entity, deltaTime) {
    entity.position.x += entity.velocity.dx * deltaTime;
    entity.position.y += entity.velocity.dy * deltaTime;
}

export const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");
export let height = canvas.height;
export let width = canvas.width;
export let halfWidth = width / 2;
export let halfHeight = height / 2;
