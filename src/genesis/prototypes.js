import { mapRange } from '../utils/utils';

export {
    display,
    applyForce,
    updateForce,
    seek
}

function display() {
    const { x, y } = this.position;
    this.shape.position.set(x, y);
}

function applyForce(force, weight) {
    const weighted = force.multiply(weight || 1);
    this.acceleration.add(weighted);
}

function updateForce() {
    const { position, velocity, acceleration, maxSpeed } = this;
    velocity.add(acceleration).limit(maxSpeed);
    position.add(velocity);
    acceleration.set(0, 0);
}

function seek(target, reduce = true) {
    const { position, velocity, maxSpeed, maxForce } = this;
    let steer = target
        .isubtract(position)
        .normalize(maxSpeed)
        .subtract(velocity);
        
    if (reduce) {
        const dist = position.distance(target);
        if (dist < 100) {
            const weight = mapRange(dist, 0, 100);
            steer = steer.multiply(weight);
        }
    }
    return steer.limit(maxForce);
}