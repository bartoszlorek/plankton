import { forEach } from 'lodash';
import { Point, Tool } from 'paper';
import { limit } from '../utils/utils';

export {
    observe,
    separate,
    seekMouse
}

const tool = new Tool();
let mousePoint = new Point(0,0);
tool.onMouseMove = function(e) {
    mousePoint = e.point;
}

function observe(entity, tank, data) {
    data.closest = tank.radius(entity, 50);
}

function separate(entity, tank, data) {
    const { position } = entity;
    const { closest } = data;
    const radius = entity.radius * 2;
    let sum = new Point(0, 0);
    let count = 0;

    forEach(closest, item => {
        let dist = position.getDistance(item.position);
        if (dist > 0 && dist < radius) {
            let diff = position
                .subtract(item.position)
                .normalize()
                .divide(dist);
            sum = sum.add(diff);
            count++;
        }
    });
    if (count > 0) {
        const { velocity, maxSpeed, maxForce } = entity.physics;
        const steer = limit(sum
            .divide(count)
            .normalize(maxSpeed)
            .subtract(velocity),
            maxForce);
        entity.applyForce(steer, 2);
    }
}

function seekMouse(entity, tank, data) {
    const toMouse = entity.seek(mousePoint);
    entity.applyForce(toMouse, 1);
}