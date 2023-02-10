import { round } from './index';
export var hexToRgba = function (hex) {
    if (hex[0] === '#')
        hex = hex.substring(1);
    if (hex.length < 6) {
        return {
            r: parseInt(hex[0] + hex[0], 16),
            g: parseInt(hex[1] + hex[1], 16),
            b: parseInt(hex[2] + hex[2], 16),
            a: hex.length === 4 ? round(parseInt(hex[3] + hex[3], 16) / 255, 2) : 1,
        };
    }
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16),
        a: hex.length === 8 ? round(parseInt(hex.substring(6, 8), 16) / 255, 2) : 1,
    };
};
export var hsvaToHex = function (hsva) { return rgbaToHex(hsvaToRgba(hsva)); };
export var hsvaToHsla = function (_a) {
    var h = _a.h, s = _a.s, v = _a.v, a = _a.a;
    var hh = ((200 - s) * v) / 100;
    return {
        h: round(h),
        s: round(hh > 0 && hh < 200 ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0),
        l: round(hh / 2),
        a: round(a, 2),
    };
};
export var hsvaToHslString = function (hsva) {
    var _a = hsvaToHsla(hsva), h = _a.h, s = _a.s, l = _a.l;
    return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
};
export var hsvaToHsvString = function (hsva) {
    var _a = roundHsva(hsva), h = _a.h, s = _a.s, v = _a.v;
    return "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)");
};
export var hsvaToHslaString = function (hsva) {
    var _a = hsvaToHsla(hsva), h = _a.h, s = _a.s, l = _a.l, a = _a.a;
    return "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(a, ")");
};
export var hsvaToRgba = function (_a) {
    var h = _a.h, s = _a.s, v = _a.v, a = _a.a;
    h = (h / 360) * 6;
    s = s / 100;
    v = v / 100;
    var hh = Math.floor(h);
    var b = v * (1 - s);
    var c = v * (1 - (h - hh) * s);
    var d = v * (1 - (1 - h + hh) * s);
    var m = hh % 6;
    return {
        r: round([v, c, b, b, d, v][m] * 255),
        g: round([d, v, v, c, b, b][m] * 255),
        b: round([b, b, d, v, v, c][m] * 255),
        a: round(a, 2),
    };
};
var format = function (number) {
    var hex = number.toString(16);
    return hex.length < 2 ? '0' + hex : hex;
};
export var aToHex = function (a) {
    var alphaHex = a < 1 ? format(round(a * 255)) : '';
    return alphaHex;
};
export var rgbToHex = function (_a) {
    var r = _a.r, g = _a.g, b = _a.b;
    return (format(r) + format(g) + format(b)).toUpperCase();
};
export var alphaToPer = function (a) {
    return "".concat((a * 100).toFixed(0), "%");
};
export var rgbaToHex = function (_a) {
    var r = _a.r, g = _a.g, b = _a.b, a = _a.a;
    var alphaHex = a < 1 ? format(round(a * 255)) : '';
    return '#' + format(r) + format(g) + format(b) + alphaHex;
};
export var rgbaToHsva = function (_a) {
    var r = _a.r, g = _a.g, b = _a.b, a = _a.a;
    var max = Math.max(r, g, b);
    var delta = max - Math.min(r, g, b);
    // prettier-ignore
    var hh = delta
        ? max === r
            ? (g - b) / delta
            : max === g
                ? 2 + (b - r) / delta
                : 4 + (r - g) / delta
        : 0;
    return {
        h: round(60 * (hh < 0 ? hh + 6 : hh)),
        s: round(max ? (delta / max) * 100 : 0),
        v: round((max / 255) * 100),
        a: a,
    };
};
export var roundHsva = function (hsva) { return ({
    h: round(hsva.h),
    s: round(hsva.s),
    v: round(hsva.v),
    a: round(hsva.a, 2),
}); };
