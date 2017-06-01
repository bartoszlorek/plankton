import { vec2 } from 'gl-matrix';

vec2.addTo = function (out, a) {
    out[0] += a[0];
    out[1] += a[1];
    return out;
};

vec2.normalizeTo = function (out, a) {
    vec2.normalize(out, out);
    vec2.scale(out, out, a);
    return out;
};

vec2.limit = function (out, a) {
    if (vec2.sqrLen(out) > a * a) {
        vec2.normalizeTo(out, a);
    }
    return out;
};

vec2.divideScalar = function (out, a, s) {
    out[0] = a[0] / s;
    out[1] = a[1] / s;
    return out;
};

vec2.randomIn = function (out, a, b) {
    out[0] = Math.random() * a;
    out[1] = Math.random() * b;
    return out;
};