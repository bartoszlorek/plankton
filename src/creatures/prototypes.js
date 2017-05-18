import { forEach } from 'lodash';
import paper, { Path, Point } from 'paper';

export {
    alive,
    display,
    movement
}

function alive(tank) {
    paper.view.onFrame = function (e) {
        forEach(tank, creature => {
            if (creature.movement) {
                creature.movement();
            }
        });
    }
}

function display(props, spec) {
    const { fillColor, radius } = spec;
    return new Path.Circle({
        center: [0, 0],
        fillColor,
        radius
    });
}

function movement(props) {
    return () => {
        props.body.position = props.position;
    }
}