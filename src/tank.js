import { create, forEach } from 'lodash';
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
        each: each(content),
        prepare: prepare(actions),
        radius: radius(content),
        alive
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
    return (point, value) => {
        return content.filter(entity => {
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