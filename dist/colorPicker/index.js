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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { hsvaToRgba, rgbaToHsva } from '@component/editor/setting/common/colorPicker/utils/convert';
import { equalColorObjects } from '@component/editor/setting/common/colorPicker/utils';
import { useColorManipulation } from '@component/editor/setting/common/colorPicker/hooks/useColorManipulation';
import { Saturation } from './common/saturation';
import { Alpha } from '@component/editor/setting/common/colorPicker/common/alpha';
import { Hue } from '@component/editor/setting/common/colorPicker/common/hue';
import ColorInput from '@component/editor/setting/common/colorPicker/colorInput';
import BrandColor from '@component/editor/setting/common/colorPicker/brandColor';
import Palette from '@component/editor/setting/common/colorPicker/palette';
import classNames from 'classnames/bind';
import style from './ColorPicker.module.scss';
var cx = classNames.bind(style);
var colorModel = {
    defaultColor: { r: 0, g: 0, b: 0, a: 1 },
    toHsva: rgbaToHsva,
    fromHsva: hsvaToRgba,
    equal: equalColorObjects,
};
var ColorPicker = function (_a) {
    var color = _a.color, onChange = _a.onChange, rest = __rest(_a, ["color", "onChange"]);
    var nodeRef = useRef(null);
    var _b = useColorManipulation(colorModel, color, onChange), hsva = _b[0], updateHsva = _b[1];
    return (_jsxs("div", __assign({}, rest, { ref: nodeRef, className: cx('area') }, { children: [_jsx(Saturation, { hsva: hsva, onChange: updateHsva }), _jsxs("div", __assign({ className: cx('controlArea') }, { children: [_jsxs("div", __assign({ className: cx('controlWrap') }, { children: [_jsx(Hue, { hue: hsva.h, onChange: updateHsva }), _jsx(Alpha, { hsva: hsva, onChange: updateHsva })] })), _jsx(ColorInput, { color: color, onChange: onChange }), _jsx(BrandColor, {}), _jsx(Palette, { color: color, onChange: onChange })] }))] })));
};
export default ColorPicker;
