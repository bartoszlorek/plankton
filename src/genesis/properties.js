import Vector from '../utils/vector.min';
import { Graphics } from 'pixi.js';

export {
    organism
}

function createShape(radius, color) {
    const shape = new Graphics();
    shape.beginFill(color);
    shape.drawCircle(0, 0, radius);
    shape.endFill();
    return shape;
}

function organism(props, spec) {
    const { position, color, radius, maxSpeed, maxForce } = spec;
    Object.assign(props, {
        maxSpeed: maxSpeed || 3,
        maxForce: maxForce || 0.5,
        acceleration: new Vector(0, 0),
        velocity: new Vector(0, 0),
        shape: createShape(radius, color),
        radius: radius || 8,
        position
    })
}