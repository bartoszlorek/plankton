import Vector from './vector.min';

const pool = [];

export default {
    pick: () => {
        if (pool.length > 0) {
            return pool.pop();
        }
        return new Vector();
    },
    free: (item) => {
        item.set(0, 0);
        pool.push(item);
    }
}