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
import { clamp, round } from '../../utils';
import { Pointer } from '../pointer';
import classNames from 'classnames/bind';
import style from './Hue.module.scss';
import { Interactive } from '@component/editor/setting/common/colorPicker/common/interactive';
var cx = classNames.bind(style);
var HueBase = function (_a) {
    var hue = _a.hue, onChange = _a.onChange;
    var handleMove = function (interaction) {
        onChange({ h: 360 * interaction.left });
    };
    var handleKey = function (offset) {
        onChange({
            h: clamp(hue + offset.left * 360, 0, 360),
        });
    };
    return (_jsx("div", __assign({ className: cx('hueArea') }, { children: _jsx(Interactive, __assign({ onMove: handleMove, onKey: handleKey, "aria-label": "Hue", "aria-valuenow": round(hue), "aria-valuemax": "360", "aria-valuemin": "0" }, { children: _jsx(Pointer, { className: cx('pointer'), left: hue / 360 }) })) })));
};
export var Hue = React.memo(HueBase);
