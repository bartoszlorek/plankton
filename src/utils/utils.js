import { random } from 'lodash';
import paper, { Point } from 'paper';
import math from 'mathjs';

export {
    populator,
    getPosition,
    randomPosition,
    eachTime
}

function populator(tank) {
    return (creature, quantity) => {
        if (typeof creature !== 'function') {
            throw 'creature must be a function';
        }
        const { content } = tank;
        while (quantity) {
            let entity = creature({
                position: randomPosition()
            });
            content.push(entity);
            quantity -= 1;
        }
    }
}

function getPosition(spec) {
    const { position, x, y } = spec;
    return position || new Point(x, y);
}

function randomPosition() {
    const { width, height } = paper.view.size;
    return new Point(
        random(0, width),
        random(0, height));
}

function eachTime(frame, seconds, callback) {
    let time = math.round(frame.time, 1);
    if (time % seconds === 0) {
        callback();
    }
}