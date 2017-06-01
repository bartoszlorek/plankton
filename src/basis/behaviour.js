import Vector from '../utils/vector.min';
import { forEach } from 'lodash';

export {
    observe,
    separate,
    seekMouse
}

const mousePoint = new Vector(0, 0);
document.onmousemove = function (e) {
    mousePoint.set(e.pageX, e.pageY);
}

function observe(entity, tank, data) {
    data.closest = tank.radius(entity, 50);
}

function separate(entity, tank, data) {
    const { position, radius } = entity;
    const diameterSq = radius * radius * 2;
    const sum = new Vector(0, 0);
    let count = 0;

    forEach(data.closest, item => {
        let dist = position.distanceSqr(item.position);
        if (dist < diameterSq) {
            let diff = position
                .isubtract(item.position)
                .normalize()
                .divide(dist);
            sum.add(diff);
            count++;
        }
    });
    if (count > 0) {
        const { velocity, maxSpeed, maxForce } = entity;
        const steer = sum
            .divide(count)
            .normalize(maxSpeed)
            .subtract(velocity)
            .limit(maxForce);
        entity.applyForce(steer);
    }
}

function seekMouse(entity, tank, data) {
    const toMouse = entity.seek(mousePoint);
    entity.applyForce(toMouse, .1);
}