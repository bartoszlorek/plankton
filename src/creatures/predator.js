import { create } from 'lodash';
import { getPosition } from '../utils';
import { movement, display } from './prototypes';

export default function () {
    let id = -1;

    return (spec) => {
        const props = {
            id: (id += 1),
            type: 'predator',
            position: getPosition(spec),
            body: display(props, {
                fillColor: '#e0244d',
                radius: 24
            })
        }
        const proto = {
            movement: movement(props)
        }
        return create(proto, props);
    }
}