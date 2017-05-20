import { Point, Tool } from 'paper';
import { limit } from '../utils/utils';

export {
    movement,
    seekMouse
}

const tool = new Tool();
let mousePoint = new Point(0,0);
tool.onMouseMove = function(e) {
    mousePoint = e.point;
}

function movement(entity) {
    const { velocity, acceleration, maxSpeed, position } = entity;
    const boost = velocity.add(acceleration);
    const limited = limit(boost, maxSpeed);
    entity.velocity = limited;
    entity.position = position.add(limited);
    entity.acceleration = new Point(0,0);
}

function seekMouse(entity, tank) {
    const closest = tank.radius(entity, 50)[0];
    let toMouse = entity.seek(mousePoint);
    if (closest) {
        const social = entity
            .seek(closest.position)
            .multiply(-1);
        toMouse = toMouse.add(social);
    }
    entity.applyForce(toMouse);
}