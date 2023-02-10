import { hexToRgba } from '@component/editor/setting/common/colorPicker/utils/convert';
export var clamp = function (number, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return number > max ? max : number < min ? min : number;
};
export var formatClassName = function (names) { return names.filter(Boolean).join(' '); };
export var round = function (number, digits, base) {
    if (digits === void 0) { digits = 0; }
    if (base === void 0) { base = Math.pow(10, digits); }
    return Math.round(base * number) / base;
};
export var equalColorObjects = function (first, second) {
    if (first === second)
        return true;
    for (var prop in first) {
        if (first[prop] !== second[prop])
            return false;
    }
    return true;
};
export var equalHex = function (first, second) {
    if (first.toLowerCase() === second.toLowerCase())
        return true;
    return equalColorObjects(hexToRgba(first), hexToRgba(second));
};
