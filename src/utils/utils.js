import Vector from './vector.min';
import math from 'mathjs';
import { Graphics } from 'pixi.js';

export {
    populator,
    createShape,
    eachTime,
    mapRange
}

function populator(tank) {
    return (creature, quantity) => {
        if (typeof creature !== 'function') {
            throw 'creature must be a function';
        }
        const { width, height } = tank;
        while (quantity) {
            let entity = creature({
                position: Vector.random(width, height)
            });
            tank.add(entity);
            quantity -= 1;
        }
    }
}

function createShape(radius, color) {
    const shape = new Graphics();
    shape.beginFill(color);
    shape.drawCircle(0, 0, radius);
    shape.endFill();
    return shape;
}

function eachTime(frame, seconds, callback) {
    let time = math.round(frame.time, 1);
    if (time % seconds === 0) {
        callback();
    }
}

function mapRange(value, inMin, inMax, outMin = 0, outMax = 1) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}