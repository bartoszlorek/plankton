import { forEach, isObject } from 'lodash';

export default function (object, props) {
    forEach(props, (prop, name) => {
        if (! isDescriptor(prop)) {
            prop = { value: prop };
        }
        Object.defineProperty(object, name, prop);
    });
}

const descriptorsKeys = [
    'set',
    'get',
    'enumerable',
    'writable',
    'configurable'
];

function isDescriptor(value) {
    if (isObject(value)) {
        const keys = Object.keys(value);
        const length = keys.length;
        let i = 0;

        while (i < length) {
            if (descriptorsKeys.indexOf(keys[i]) !== -1) {
                return true;
            }
            i += 1;
        }
    }
    return false;
}