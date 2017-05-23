import paper from 'paper';
import { populator } from './utils/utils';
import createTank from './tank';
import createPlankter from './creatures/plankter';
import createPredator from './creatures/predator';

paper.setup(document.querySelector('#app'));

const tank = createTank();
const populate = populator(tank);
const plankter = createPlankter();
const predator = createPredator();

populate(plankter, 30);
populate(predator, 5);
tank.alive();