import { random } from 'lodash';
import paper, { Point } from 'paper';

export {
    populator,
    getPosition,
    randomPosition
}

function populator(tank) {
    return (creature, quantity) => {
        if (typeof creature !== 'function') {
            throw 'creature must be a function';
        }
        while (quantity) {
            let entity = creature({
                position: randomPosition()
            });
            tank.push(entity);
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