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
import classNames from 'classnames/bind';
import style from './BrandColor.module.scss';
var cx = classNames.bind(style);
var BrandColor = function () {
    return (_jsxs("div", __assign({ className: cx('checkBoxWrap') }, { children: [_jsx("input", { type: 'checkbox' }), _jsx("span", __assign({ className: cx('text') }, { children: "\uBE0C\uB79C\uB4DC \uCEEC\uB7EC" }))] })));
};
export default BrandColor;
