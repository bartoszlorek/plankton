import { create, forEach, sortBy } from 'lodash';
import paper from 'paper';

const FPS = 60 / 60;

export default function () {
    const content = [];
    const actions = [];

    const props = {
        content,
        actions
    }
    const proto = {
        alive,
        each: each(content),
        prepare: prepare(actions),
        radius: radius(content),
        get width() {
            return paper.view.size.width;
        },
        get height() {
            return paper.view.size.height;
        }
    }
    return create(proto, props);
}

function each(content) {
    return callback => forEach(content, entity => callback(entity));
}

function prepare(actions) {
    return callback => actions.push(callback);
}

function radius(content) {
    return (entity, value) => {
        const position = entity.position;
        const closest = [];
        forEach(content, next => {
            if (entity !== next) {
                let dist = position.getDistance(next.position);
                if (dist < value) {
                    closest.push([dist, next]);
                }
            }
        });
        return closest
            .sort((a, b) => a[0] - b[0])
            .map(item => item[1]);
    }
}

function alive() {
    const tank = this;
    const { actions } = tank;
    const data = {};

    paper.view.on('frame', frame => {
        if (!validFrame(frame)) {
            return;
        }
        if (actions.length) {
            forEach(actions, action => {
                action(data);
            });
        }
        tank.each(entity => {
            if (entity.behavior) {
                forEach(entity.behavior, behavior => {
                    behavior(entity, tank, frame, data);
                });
            }
        });
    });
}

function validFrame(frame) {
    if (FPS <= 1) {
        return true;
    }
    return frame.count % FPS === 0;
}