import { create } from 'lodash';
import { getPosition } from '../utils/utils';
import { display, physics, applyForce, seek } from './prototypes';
import { movement, seekMouse } from './behavior';

export default function () {
    let id = -1;

    const proto = {
        seek,
        applyForce,
        behavior: [
            seekMouse,
            movement
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
            type: 'predator',
            body: display(props, {
                fillColor: '#e0244d',
                radius: 24
            })
        }
        Object.assign(props, physics({
            maxForce: .5,
            maxSpeed: 7
        }));

        const entity = create(proto, props);
        entity.position = getPosition(spec);
        return entity;
    }
}