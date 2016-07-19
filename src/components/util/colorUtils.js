"use strict";

const BASE_16 = 16;

const calculateColors = function(elements) {
    const a = 220;
    const b = 30;
    let colors = new Map();
    let base = [a, a, a];
    let diff = [b, b, b];
    let current = [0, 0, 0];
    let u = 0;
    let s = true;
    for (let i = 0; i<elements.length; i++) {
        let uMod = u % 6;
        if (uMod < 3) {
            current[uMod] = base[uMod] + diff[uMod];
            diff[uMod] = diff[uMod] > 0 ? -diff[uMod] : Math.floor(diff[uMod]/-2);
        }
        let r = current[0];
        let g = current[1];
        let b = current[2];

        let rgb = {r:0, g:0, b:0};
        switch (u % 6) {
            case 0:
                rgb.r = r;
                rgb.g = 100;
                rgb.b = 100;
                break;
            case 1:
                rgb.r = 100;
                rgb.g = g;
                rgb.b = 100;
                break;
            case 2:
                rgb.r = 100;
                rgb.g = 100;
                rgb.b = b;
                break;
            case 3:
                rgb.r = r;
                rgb.g = g;
                rgb.b = 16;
                break;
            case 4:
                rgb.r = r;
                rgb.g = 16;
                rgb.b = b;
                break;
            case 5:
                rgb.r = 16;
                rgb.g = g;
                rgb.b = b;
                break;
        }
        colors.set(elements[i], rgb);
        u++;
    }
    return colors;
}

const RGBtoHex = function(rInt, gInt, bInt) {
    const r = rInt.toString(BASE_16);
    const g = gInt.toString(BASE_16);
    const b = bInt.toString(BASE_16);
    return `#${r.length < 2 ? '0' + r : r}${g.length < 2 ? '0' + g : g}${b.length < 2 ? '0' + b : b}`;
};


export {
    calculateColors,
    RGBtoHex
};
