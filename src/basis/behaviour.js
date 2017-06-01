import Vector from '../utils/vector.min';
import pool from '../utils/pool';
import { forEach } from 'lodash';
import { vec2 } from 'gl-matrix';

export {
    observe,
    separate,
    //seekMouse
}

// const mousePoint = new Vector(0, 0);
// document.onmousemove = function (e) {
//     mousePoint.set(e.pageX, e.pageY);
// }

function observe(entity, tank, data) {
    data.closest = tank.radius(entity, 50);
}

function separate(entity, tank, data) {
    const { position, radius } = entity;
    const diameterSq = radius * radius * 2;
    const sum = pool.pick();
    let count = 0;

    forEach(data.closest, item => {
        let dist = vec2.sqrDist(position, item.position);
        if (dist < diameterSq) {
            const diff = pool.pick();
            vec2.subtract(diff, position, item.position);
            vec2.normalize(diff, diff);
            vec2.divideScalar(diff, diff, dist);
            vec2.addTo(sum, diff);
            pool.free(diff);
            count++;
        }
    });
    if (count > 0) {
        const { velocity, maxSpeed, maxForce } = entity;
        const steer = pool.pick();
        vec2.divideScalar(steer, sum, count);
        vec2.normalizeTo(steer, maxSpeed);
        vec2.subtract(steer, steer, velocity);
        vec2.limit(steer, maxForce);
        entity.applyForce(steer);
        pool.free(steer);
    }
    pool.free(sum);
}

// function seekMouse(entity, tank, data) {
//     const toMouse = entity.seek(mousePoint);
//     entity.applyForce(toMouse, .1);
// }