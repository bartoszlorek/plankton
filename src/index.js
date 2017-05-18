import paper from 'paper';
import { populator } from './utils';
import { alive } from './creatures/prototypes';
import createPlankter from './creatures/plankter';
import createPredator from './creatures/predator';

paper.setup(document.querySelector('#app'));

const tank = [];
const populate = populator(tank);
const plankter = createPlankter();
const predator = createPredator();

populate(plankter, 20);
populate(predator, 5);
alive(tank);

console.log(tank);