const TABLE_SIZE = 255;
let table;

noise.generate = generate;

export default function noise(value, scale, shift) {
    if (table === undefined) {
        generate();
    }
    scale = scale || 1;
    shift = shift || 0;

    const scaled = value * scale + shift;
    const floor = Math.floor(scaled);
    const t = scaled - floor;
    const tRemapSmoothstep = t * t * (3 - 2 * t);
    const min = floor % TABLE_SIZE;
    const max = (min + 1) % TABLE_SIZE;

    return lerp(
        table[min],
        table[max],
        tRemapSmoothstep
    );
}

function generate() {
    table = [];
    let length = TABLE_SIZE + 1;
    while (length--) {
        table.push(Math.random());
    }
}

function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}