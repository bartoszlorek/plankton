import Vector from '../utils/vector.min';
import pool from '../utils/pool';
import { create, defaults } from 'lodash';
import { mapRange, createShape } from '../utils/utils';

export default function (proto) {
    let id = -1;
    defaults(proto, {
        applyForce,
        updateForce,
        display,
        borders,
        seek
    });

    return (props) => {
        defaults(props, {
            shape: createShape(
                props.radius,
                props.color
            ),
            acceleration: new Vector(0, 0),
            velocity: new Vector(0, 0),
            maxSpeed: 3,
            maxForce: 0.5,
            id: (id += 1)
        });
        return create(proto, props);
    }
}

function applyForce(force, weight) {
    if (weight !== undefined) {
        force.multiply(weight);
    }
    this.acceleration.add(force);
}

function updateForce() {
    this.velocity
        .add(this.acceleration)
        .limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
}

function display() {
    const { x, y } = this.position;
    this.shape.position.set(x, y);
}

function borders(tank) {
    const { x, y } = this.position;
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
        force.set(fx || 0, fy || 0)
        this.applyForce(force);
        pool.free(force);
    }
}

function seek(target, reduce = true) {
    const steer = target
        .isubtract(this.position)
        .normalize(this.maxSpeed)
        .subtract(this.velocity);

    if (reduce) {
        const dist = this.position.distanceSqr(target);
        if (dist < 1000) {
            const limiter = mapRange(dist, 0, 1000);
            steer.multiply(limiter);
        }
    }
    return steer.limit(this.maxForce);
}