// based on code from from scratchapixel.com, via Michael Bromley

const PERLIN_SIZE = 255;
let perlin;

export default function (value, scale) {
    if (perlin === undefined) {
        generate();
    }
    const scaled = value * (scale || 1);
    const floor = Math.floor(scaled);
    const t = scaled - floor;
    const tRemapSmoothstep = t * t * (3 - 2 * t);

    const min = floor % PERLIN_SIZE;
    const max = (min + 1) % PERLIN_SIZE;

    return lerp(perlin[min], perlin[max], tRemapSmoothstep);
}

function generate() {
    perlin = [];
    let length = PERLIN_SIZE + 1;
    while (length--) {
        perlin.push(Math.random());
    }
}

function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}