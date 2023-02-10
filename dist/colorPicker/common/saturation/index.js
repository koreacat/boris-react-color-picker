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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { hsvaToHslString } from '../../utils/convert';
import { clamp, round } from '../../utils';
import { Pointer } from '../pointer';
import { Interactive } from "../interactive";
import classNames from 'classnames/bind';
import style from './Saturation.module.scss';
var cx = classNames.bind(style);
var SaturationBase = function (_a) {
    var hsva = _a.hsva, onChange = _a.onChange;
    var handleMove = function (interaction) {
        onChange({
            s: interaction.left * 100,
            v: 100 - interaction.top * 100,
        });
    };
    var handleKey = function (offset) {
        onChange({
            s: clamp(hsva.s + offset.left * 100, 0, 100),
            v: clamp(hsva.v - offset.top * 100, 0, 100),
        });
    };
    var containerStyle = {
        backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
    };
    return (_jsx("div", __assign({ className: cx('saturationArea'), style: containerStyle }, { children: _jsx(Interactive, __assign({ onMove: handleMove, onKey: handleKey, "aria-label": "Color", "aria-valuetext": "Saturation ".concat(round(hsva.s), "%, Brightness ").concat(round(hsva.v), "%") }, { children: _jsx(Pointer, { className: cx('pointer'), top: 1 - hsva.v / 100, left: hsva.s / 100 }) })) })));
};
export var Saturation = React.memo(SaturationBase);
