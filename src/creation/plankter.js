import { observe, separate, align, desireMouse, avoidMouse } from '../basis/behaviour';
import organism from '../basis/organism';

export default function () {
    const createOrganism = organism({
        behaviour: [
            observe,
            separate,
            align,
            desireMouse,
            //avoidMouse
        ]
    });

    return (spec) => createOrganism({
        position: spec.position,
        type: 'plankter',
        maxForce: .5,
        maxSpeed: 3,
        color: 0xffc107,
        radius: 8
    });
}