import Vector from './vector.min';
import math from 'mathjs';

export {
    populator,
    getPosition,
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
            console.log( entity )
            tank.add(entity);
            quantity -= 1;
        }
    }
}

function getPosition(spec) {
    const { position, x, y } = spec;
    return position || new Vector(x, y);
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