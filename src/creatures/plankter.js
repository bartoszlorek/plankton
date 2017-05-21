import { create } from 'lodash';
import { getPosition } from '../utils/utils';
import { body, physics, applyForce, updateForce, seek } from '../basis/prototypes';
import { observe, separate, seekMouse } from '../basis/behavior';

export default function () {
    let id = -1;

    const proto = {
        applyForce,
        updateForce,
        seek,
        behavior: [
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
            type: 'plankter'
        }
        body(props, {
            fillColor: '#ffc107',
            radius: 8
        });
        physics(props, {
            maxForce: .5,
            maxSpeed: 3
        });
        const entity = create(proto, props);
        entity.position = getPosition(spec);
        return entity;
    }
}