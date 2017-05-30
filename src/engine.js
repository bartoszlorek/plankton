import { Application } from 'pixi.js';

const engine = new Application({
    antialias: true,
    transparent: true,
    autoResize: true
});

document.body.appendChild(engine.view);
export default engine;








//     function resize(tank) {
//     const { renderer } = tank.engine;
//     return () => {
//         const { width, height } = tank;
//         renderer.resize(width, height);
//     }
// }