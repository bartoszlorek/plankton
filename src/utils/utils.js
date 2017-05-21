import { random, forEach, isObject } from 'lodash';
import paper, { Point } from 'paper';
import math from 'mathjs';

export {
    populator,
    getPosition,
    randomPosition,
    eachTime,
    limit,
    mapRange,
    define
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

function limit(point, value) {
    if (point.length > value) {
        return point.normalize(value);
    }
    return point;
}

function mapRange(value, inMin, inMax, outMin = 0, outMax = 1) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function define(object, props) {
    forEach(props, (prop, name) => {
        if (! isDescriptor(prop)) {
            prop = { value: prop };
        }
        Object.defineProperty(object, name, prop);
    });
}

const descriptorsKeys = [
    'set',
    'get',
    'enumerable',
    'writable',
    'configurable'
];

function isDescriptor(value) {
    if (isObject(value)) {
        const keys = Object.keys(value);
        const length = keys.length;
        let i = 0;

        while (i < length) {
            if (descriptorsKeys.indexOf(keys[i]) !== -1) {
                return true;
            }
            i += 1;
        }
    }
    return false;
}