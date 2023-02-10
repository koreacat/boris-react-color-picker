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
import { useEffect, useState } from 'react';
import { alphaToPer, aToHex, hexToRgba, rgbToHex } from "../utils/convert";
import classNames from 'classnames/bind';
import style from './ColorInput.module.scss';
var cx = classNames.bind(style);
var ColorInput = function (_a) {
    var color = _a.color, onChange = _a.onChange;
    var _b = useState(rgbToHex(color)), colorText = _b[0], setColorText = _b[1];
    var _c = useState(alphaToPer(color.a)), alphaText = _c[0], setAlphaText = _c[1];
    useEffect(function () {
        setColorText(rgbToHex(color));
        setAlphaText(alphaToPer(color.a));
    }, [color]);
    var handleKeydown = function (e) {
        if (e.key === 'Enter') {
            handleBlurColor();
            handleBlurAlpha();
        }
    };
    var handleChangeColor = function (e) {
        setColorText(e.target.value);
    };
    var handleBlurColor = function () {
        // 입력 받은 결과에서 숫자, a-f 를 제외한 문자를 제거 후, 앞에서 부터 6자리를 자릅니다.
        var result = colorText.replace(/[^a-fA-F0-9]+/g, '').slice(0, 6);
        // 앞에서 자른 6자리의 문자열이 rgb Hex 형식인지 테스트합니다.
        var isHexText = /^[0-9A-Fa-f]{6}$/.test(result);
        // 결과가 hex 형식인 경우 color와 colorText를 변경합니다.
        if (isHexText) {
            setColorText(result);
            onChange(hexToRgba(result + aToHex(color.a)));
        }
        // 결과가 hex 형식이 아닌 경우 원래의 color로 되돌아갑니다.
        else {
            setColorText(rgbToHex(color));
        }
    };
    var handleChangeAlpha = function (e) {
        setAlphaText(e.target.value);
    };
    var handleBlurAlpha = function () {
        // 입력 받은 결과에서 숫자를 제외한 문자를 제거 후, 앞에서 부터 3자리를 자릅니다.
        var result = alphaText.replace(/[^0-9]+/g, '').slice(0, 3);
        if (result) {
            setAlphaText(result + '%');
            onChange(hexToRgba(colorText + aToHex(Number(result) / 100)));
        }
        else {
            setAlphaText(alphaToPer(color.a));
        }
    };
    return (_jsxs("div", __assign({ className: cx('inputWrap') }, { children: [_jsx("input", { className: cx('input'), type: 'text', value: colorText, onChange: handleChangeColor, onBlur: handleBlurColor, onKeyDown: handleKeydown }), _jsx("input", { className: cx('input', 'alpha'), type: 'text', value: alphaText, onChange: handleChangeAlpha, onBlur: handleBlurAlpha, onKeyDown: handleKeydown })] })));
};
export default ColorInput;
