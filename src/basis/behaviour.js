import Vector from '../utils/vector.min';
import pool from '../utils/pool';
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
    const sum = pool.pick();
    let count = 0;

    forEach(data.closest, item => {
        let dist = position.distanceSqr(item.position);
        if (dist < diameterSq) {
            const diff = pool.pick();
            diff.set(position)
                .subtract(item.position)
                .normalize()
                .divide(dist);
            sum.add(diff);
            pool.free(diff);
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
    pool.free(sum);
}

function seekMouse(entity, tank, data) {
    const toMouse = entity.seek(mousePoint);
    entity.applyForce(toMouse, .1);
}