import { observe, separate, seekMouse } from '../basis/behaviour';
import organism from '../basis/organism';

export default function () {
    const create = organism({
        behaviour: [
            observe,
            separate,
            //seekMouse
        ]
    });

    return (spec) => create({
        position: spec.position,
        type: 'plankter',
        maxForce: .5,
        maxSpeed: 3,
        color: 0xffc107,
        radius: 8
    });
}