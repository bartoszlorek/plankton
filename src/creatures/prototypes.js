import paper, { Path } from 'paper';
import { eachTime } from '../utils/utils';
import noise from '../utils/noise';

export {
    display,
    movement
}

function display(props, spec) {
    const { fillColor, radius } = spec;
    return new Path.Circle({
        center: [0, 0],
        fillColor,
        radius
    });
}

function movement(creature, tank, frame, data) {
    const x = creature.id * 50;
    const y = noise(creature.id) * 100 + paper.view.size.height / 2;
    creature.body.position.set(x, y);
    //creature.body.position = creature.position;
}