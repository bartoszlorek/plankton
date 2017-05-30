import { create } from 'lodash';
import { getPosition } from '../utils/utils';
import { body, physics, applyForce, updateForce, seek } from '../basis/prototypes';
import { observe, separate, seekMouse } from '../basis/behaviour';

export default function () {
    let id = -1;

    const proto = {
        applyForce,
        updateForce,
        seek,
        behaviour: [
            observe,
            separate,
            seekMouse
        ],
        set position(point) {
            this.body.position = point;
        },
        get position() {
            return this.body.position;
        }
    }

    return (spec) => {
        const props = {
            id: (id += 1),
            type: 'predator'
        }
        body(props, {
            fillColor: '#e0244d',
            radius: 24
        });
        physics(props, {
            maxForce: .5,
            maxSpeed: 7
        });
        const entity = create(proto, props);
        entity.position = getPosition(spec);
        return entity;
    }
}