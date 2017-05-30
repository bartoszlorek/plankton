import { create } from 'lodash';
import { getPosition } from '../utils/utils';
import { organism, display, applyForce, updateForce, seek } from '../basis/prototypes';
import { observe, separate, seekMouse } from '../basis/behaviour';

export default function () {
    let id = -1;

    const proto = {
        applyForce,
        updateForce,
        display,
        seek,
        behaviour: [
            //observe,
            separate,
            seekMouse
        ]
    }

    return (spec) => {
        const props = {
            id: (id += 1),
            type: 'plankter'
        }
        organism(props, {
            position: getPosition(spec),
            maxForce: .5,
            maxSpeed: 3,
            color: 0xffc107,
            radius: 8
        });
        return create(proto, props);
    }
}