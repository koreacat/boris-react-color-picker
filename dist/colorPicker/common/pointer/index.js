import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames/bind';
import style from './Pointer.module.scss';
var cx = classNames.bind(style);
export var Pointer = function (_a) {
    var className = _a.className, left = _a.left, _b = _a.top, top = _b === void 0 ? 0.5 : _b;
    var style = {
        top: "".concat(top * 100, "%"),
        left: "".concat(left * 100, "%"),
    };
    return _jsx("div", { className: cx('pointer', className), style: style });
};
