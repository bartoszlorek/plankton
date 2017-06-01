import Vector from '../utils/vector.min';
import { create, defaults } from 'lodash';
import { mapRange, createShape } from '../utils/utils';
import { vec2 } from 'gl-matrix';
import pool from '../utils/pool';

export default function (proto) {
    let id = -1;
    defaults(proto, {
        applyForce,
        updateForce,
        display,
        borders,
        //seek
    });

    return (props) => {
        defaults(props, {
            shape: createShape(
                props.radius,
                props.color
            ),
            acceleration: vec2.create(),
            velocity: vec2.create(),
            maxSpeed: 3,
            maxForce: 0.5,
            id: (id += 1)
        });
        return create(proto, props);
    }
}

function applyForce(force, weight) {
    vec2.scale(force, force, weight || 1)
    vec2.addTo(this.acceleration, force);
}

function updateForce() {
    vec2.addTo(this.velocity, this.acceleration);
    vec2.limit(this.acceleration, this.maxSpeed);
    vec2.addTo(this.position, this.velocity);
    vec2.set(this.acceleration, 0, 0);
}

function display() {
    // set pixi.js
    this.shape.position.set(
        this.position[0],
        this.position[1]
    ); 
}

function borders(tank) {
    const x = this.position[0];
    const y = this.position[1];
    const { radius } = this;
    const { width, height } = tank;
    let fx, fy;

    if (x < radius) {
        fx = 1 - (x / radius);
    } else if (x > width - radius) {
        fx = -(1 - ((width - x) / radius));
    }
    if (y < radius) {
        fy = 1 - (y / radius);
    } else if (y > height - radius) {
        fy = -(1 - ((height - y) / radius));
    }
    if (fx !== undefined || fy !== undefined) {
        const force = pool.pick();
        vec2.set(force, fx || 0, fy || 0);
        this.applyForce(force);
        pool.free(force);
    }
}

// function seek(target, reduce = true) {
//     const steer = target
//         .isubtract(this.position)
//         .normalize(this.maxSpeed)
//         .subtract(this.velocity);

//     if (reduce) {
//         const dist = this.position.distanceSqr(target);
//         if (dist < 1000) {
//             const limiter = mapRange(dist, 0, 1000);
//             steer.multiply(limiter);
//         }
//     }
//     return steer.limit(this.maxForce);
// }