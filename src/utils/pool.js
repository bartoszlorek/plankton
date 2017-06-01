import { vec2 } from 'gl-matrix';

const pool = [];

export default {
    pick: () => {
        if (pool.length > 0) {
            return pool.pop();
        }
        console.log('create')
        return vec2.create();
    },
    free: (item) => {
        vec2.set(item, 0, 0);
        pool.push(item);
    }
}