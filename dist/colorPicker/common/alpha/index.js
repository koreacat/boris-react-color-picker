var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Interactive } from "../interactive";
import { clamp, round } from "../../utils";
import { hsvaToHslaString } from "../../utils/convert";
import { Pointer } from "../pointer";
import classNames from 'classnames/bind';
import style from './Alpha.module.scss';
var cx = classNames.bind(style);
export var Alpha = function (_a) {
    var hsva = _a.hsva, onChange = _a.onChange;
    var handleMove = function (interaction) {
        onChange({ a: interaction.left });
    };
    var handleKey = function (offset) {
        onChange({ a: clamp(hsva.a + offset.left) });
    };
    var colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }));
    var colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));
    var gradientStyle = {
        backgroundImage: "linear-gradient(90deg, ".concat(colorFrom, ", ").concat(colorTo, ")"),
    };
    var ariaValue = round(hsva.a * 100);
    return (_jsxs("div", __assign({ className: cx('alphaArea') }, { children: [_jsx("div", { className: cx('alphaGradient'), style: gradientStyle }), _jsx(Interactive, __assign({ onMove: handleMove, onKey: handleKey, "aria-label": "Alpha", "aria-valuetext": "".concat(ariaValue, "%"), "aria-valuenow": ariaValue, "aria-valuemin": "0", "aria-valuemax": "100" }, { children: _jsx(Pointer, { className: cx('pointer'), left: hsva.a }) }))] })));
};
