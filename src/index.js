import './utils/glextend';
import { populator } from './utils/utils';
import engine from './engine';
import createTank from './tank';
import createPlankter from './creation/plankter';
//import createPredator from './creation/predator';

const tank = createTank(engine);
const populate = populator(tank);
const plankter = createPlankter();
// const predator = createPredator();

populate(plankter, 500);
// populate(predator, 5);

engine.ticker.add(() => {
    tank.update();
});