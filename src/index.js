import { populator } from './utils/utils';
import engine from './engine';
import createTank from './tank';
import createPlankter from './creatures/plankter';
import createPredator from './creatures/predator';

const tank = createTank(engine);
const populate = populator(tank);
const plankter = createPlankter();
// const predator = createPredator();



populate(plankter, 5);
// populate(predator, 5);

engine.ticker.add(() => {
    tank.update();
});