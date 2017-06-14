import Vector from '../utils/vector.min';
import { forEach } from 'lodash';

export {
    observe,
    separate,
    align,
    desireMouse,
    avoidMouse
}

const mousePoint = new Vector(0, 0);
document.onmousemove = function (e) {
    mousePoint.set(e.pageX, e.pageY);
}

function observe(entity, tank, data) {
    data.closest = tank.radius(entity, 50);
}

function separate(entity, tank, data) {
    const { closest } = data;
    if (closest.length > 0) {
        const { position, radius } = entity;
        const diameterSq = radius * radius * 2;
        const diff = Vector.receive();
        const sum = Vector.receive();
        let count = 0;

        forEach(closest, item => {
            let dist = position.distanceSq(item.position);
            if (dist < diameterSq) {
                diff.set(position)
                    .subtract(item.position)
                    .normalize()
                    .divide(dist);
                sum.add(diff);
                count++;
            }
        });
        if (count > 0) {
            const steer = sum
                .divide(count)
                .normalize(entity.maxSpeed)
                .subtract(entity.velocity)
                .limit(entity.maxForce);
            entity.applyForce(steer);
        }
        Vector.release(diff);
        Vector.release(sum);
    }
}

function align(entity, tank, data) {
    const { closest } = data;
    if (closest.length > 0) {
        const steer = Vector.receive();
        forEach(closest, item => {
            steer.add(item.velocity);
        });
        steer.divide(closest.length)
            .normalize(entity.maxSpeed)
            .subtract(entity.velocity)
            .limit(entity.maxForce);
        entity.applyForce(steer, .02);
        Vector.release(steer);
    }
}

function desireMouse(entity) {
    const toMouse = entity.seek(mousePoint, 10000, .25);
    if (toMouse !== null) {
        entity.applyForce(toMouse, .25);
    }
}

function avoidMouse(entity) {
    const toMouse = entity.seek(mousePoint, 10000, .25);
    if (toMouse !== null) {
        entity.applyForce(toMouse.negate(), .25);
    }
}