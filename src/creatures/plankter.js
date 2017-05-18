import { create } from 'lodash';
import { getPosition } from '../utils';
import { movement, display } from './prototypes';

export default function () {
    let id = -1;

    return (spec) => {
        const props = {
            id: (id += 1),
            type: 'plankter',
            position: getPosition(spec),
            body: display(props, {
                fillColor: '#ffc107',
                radius: 8
            })
        }
        const proto = {
            movement: movement(props)
        }
        return create(proto, props);
    }
}