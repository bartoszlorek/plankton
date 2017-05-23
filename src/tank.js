import { create, forEach, sortBy } from 'lodash';
import paper from 'paper';
import createGrid from './utils/grid';

const FPS = 60 / 60;

export default function () {
    const content = [];
    const props = {
        content
    }
    const proto = {
        alive,
        each: each(content),
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
    const grid = createGrid(100);
    const { content } = tank;

    paper.view.on('frame', frame => {
        if (!validFrame(frame)) {
            return;
        }
        // pre-behaviour actions
        //grid.assign(content);

        // entities behaviour
        tank.each(entity => {
            if (entity.behaviour) {
                let data = {
                    //group: grid.get(entity.group)
                }
                forEach(entity.behaviour, behaviour => {
                    behaviour(entity, tank, data, frame);
                });
                data = null;
            }
            if (entity.updateForce) {
                entity.updateForce();
            }
        });
    });
}

function validFrame(frame) {
    return FPS <= 1 || frame.count % FPS === 0;
}