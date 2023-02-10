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
import classNames from 'classnames/bind';
import style from './Palette.module.scss';
import { hexToRgba, rgbaToHex } from '@component/editor/setting/common/colorPicker/utils/convert';
var cx = classNames.bind(style);
var dummyColos = [
    '#FFFFFF',
    '#F1F3F5',
    '#DEE2E6',
    '#ADB5BD',
    '#868E96',
    '#343A40',
    '#212529',
    '#FA5252',
    '#E64980',
    '#BE4BDB',
    '#7950F2',
    '#4C6EF5',
    '#228BE6',
    '#15AABF',
];
var Check = function (_a) {
    var isWhite = _a.isWhite;
    var fill = isWhite ? '#CED4DA' : 'white';
    return (_jsx("svg", __assign({ width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsx("path", { d: "M7.66888 12.4506H7.64641C7.50026 12.4475 7.35623 12.4149 7.22289 12.355C7.08954 12.2951 6.96956 12.209 6.87013 12.1019L4.03516 9.0381L4.9689 8.17187L7.67264 11.0894L13.0501 5.73438L13.9501 6.63814L8.4339 12.1319C8.3339 12.2331 8.21477 12.3134 8.08344 12.3681C7.9521 12.4228 7.81117 12.4509 7.66888 12.4506Z", fill: fill }) })));
};
var Palette = function (_a) {
    var color = _a.color, onChange = _a.onChange;
    var isWhite = function (color) {
        return color === '#FFFFFF' || color === '#FFF' || color === '#ffffff' || color === '#fff' || color === 'white';
    };
    var isCheck = function (selectedColor) {
        return selectedColor === rgbaToHex(color).toUpperCase();
    };
    var handleClick = function (color) {
        onChange(hexToRgba(color));
    };
    var getPaletteEls = function () {
        return dummyColos.map(function (color, index) {
            return (_jsx("div", __assign({ className: cx('palette', { white: isWhite(color) }), style: { backgroundColor: color }, onClick: function () { return handleClick(color); } }, { children: isCheck(color) && _jsx(Check, { isWhite: isWhite(color) }) }), index));
        });
    };
    return _jsx("div", __assign({ className: cx('paletteWrap') }, { children: getPaletteEls() }));
};
export default Palette;
