import { create, clamp } from 'lodash';
import paper from 'paper';

export default function (resolution) {
    const cells = {};
    const props = {
        resolution,
        cells
    }
    const proto = {
        get cols() {
            return Math.floor(
                paper.view.size.width
                / this.resolution)
        },
        get rows() {
            return Math.floor(
                paper.view.size.height
                / this.resolution)
        },
        get: index => cells[index],
        assign
    }
    return create(proto, props);
}

function assign(content) {
    const { resolution, cells, cols, rows } = this;
    const index = indexByPosition(cols, rows);
    const add = addToObject(cells);
    const colsMax = cols-1;
    const rowsMax = rows-1;
    clear(cells);

    let i = content.length;
    while (i--) {
        const item = content[i];
        const { x, y } = item.position;
        const cellX = clamp(Math.floor(x / resolution), 0, colsMax);
        const cellY = clamp(Math.floor(y / resolution), 0, rowsMax);
        const cellIndex = index(cellX, cellY);
        item.group = cellIndex;
        add(cellIndex, item);
    }
}

function clear(object) {
    for (let prop in object) {
        object[prop].length = 0;
    }
}

function addToObject(object) {
    return (key, value) => {
        if (object[key] === undefined) {
            object[key] = [value];
        } else {
            object[key].push(value);
        }
    }
}

function indexByPosition(cols, rows) {
    return (x, y) => {
        if (x < 0
        ||  y < 0
        ||  x > cols - 1
        ||  y > rows - 1) {
            return -1;
        }
        return x + y * cols;
    }
}