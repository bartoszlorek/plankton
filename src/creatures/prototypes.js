import { Path } from 'paper';

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

function movement(creature, tank) {
    creature.body.position = creature.position;
}