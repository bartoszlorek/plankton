import { Path, Point } from 'paper';
import { limit } from '../utils/utils';

export {
    display,
    physics,
    applyForce,
    seek
}

function display(props, spec) {
    const { fillColor, radius } = spec;
    return new Path.Circle({
        center: [0, 0],
        fillColor,
        radius
    });
}

function physics(spec) {
    let { maxSpeed, maxForce } = spec;
    return {
        maxSpeed: maxSpeed || 3,
        maxForce: maxForce || 0.5,
        acceleration: new Point(0,0),
        velocity: new Point(0,0)
    }
}

function applyForce(force) {
    this.acceleration = this.acceleration.add(force);
}

function seek(target) {
    const { position, velocity, maxSpeed, maxForce } = this;
    const desired = target.subtract(position).normalize(maxSpeed);
    const steer = desired.subtract(velocity);
    return limit(steer, maxForce);
}