import { Path, Point } from 'paper';
import { limit, mapRange } from '../utils/utils';

export {
    body,
    physics,
    applyForce,
    updateForce,
    seek
}

function body(props, spec) {
    const { fillColor, radius } = spec;
    props.radius = radius;
    props.body = new Path.Circle({
        center: [0, 0],
        fillColor,
        radius
    });
}

function physics(props, spec) {
    const { maxSpeed, maxForce } = spec;
    props.physics = {
        maxSpeed: maxSpeed || 3,
        maxForce: maxForce || 0.5,
        acceleration: new Point(0,0),
        velocity: new Point(0,0)
    }
}

function applyForce(force, weight) {
    const physics = this.physics;
    const acc = physics.acceleration;
    const weighted = force.multiply(weight || 1);
    physics.acceleration = acc.add(weighted);
}

function updateForce() {
    const physics = this.physics;
    const { velocity, acceleration, maxSpeed } = physics;
    const boost = velocity.add(acceleration);
    const limited = limit(boost, maxSpeed);
    this.position = this.position.add(limited);
    physics.acceleration = new Point(0,0);
    physics.velocity = limited;
}

function seek(target, reduce = true) {
    const position = this.position;
    const { velocity, maxSpeed, maxForce } = this.physics;
    let steer = target
        .subtract(position)
        .normalize(maxSpeed)
        .subtract(velocity);

    if (reduce) {
        const dist = position.getDistance(target);
        if (dist < 100) {
            const weight = mapRange(dist, 0, 100);
            steer = steer.multiply(weight);
        }
    }
    return limit(steer, maxForce);
}