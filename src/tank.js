import { create, forEach } from 'lodash';
import paper from 'paper';

export default function () {
    const array = [];
    const props = {
        array
    }
    const proto = {
        each: each(array),
        radius: radius(array),
        alive
    }
    return create(proto, props);
}

function each(array) {
    return callback => {
        forEach(array, entity => callback(entity));
    }
}

function radius(array) {
    return (point, value) => {
        return array.filter(entity => {
            let { position } = entity;
            if (position === point) {
                return false;
            }
            return position.getDistance(point) < value;
        })
    }
}

function alive() {
    const tank = this;
    paper.view.onFrame = function (e) {
        tank.each(entity => {
            if (entity.behavior) {
                // pre-behavior actions here
                forEach(entity.behavior, behavior => {
                    behavior(entity, tank);
                });
            }
        })
    }
}