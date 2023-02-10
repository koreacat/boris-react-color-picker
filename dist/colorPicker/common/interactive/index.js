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
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef, useMemo, useEffect } from 'react';
import { useEventCallback } from "../../hooks/useEventCallback";
import { clamp } from "../../utils";
import classNames from 'classnames/bind';
import style from './Interactive.module.scss';
var cx = classNames.bind(style);
var isTouch = function (event) { return 'touches' in event; };
var getTouchPoint = function (touches, touchId) {
    for (var i = 0; i < touches.length; i++) {
        if (touches[i].identifier === touchId)
            return touches[i];
    }
    return touches[0];
};
var getParentWindow = function (node) {
    return (node && node.ownerDocument.defaultView) || window;
};
var getRelativePosition = function (node, event, touchId) {
    var rect = node.getBoundingClientRect();
    var pointer = isTouch(event) ? getTouchPoint(event.touches, touchId) : event;
    return {
        left: clamp((pointer.pageX - (rect.left + getParentWindow(node).pageXOffset)) / rect.width),
        top: clamp((pointer.pageY - (rect.top + getParentWindow(node).pageYOffset)) / rect.height),
    };
};
var preventDefaultMove = function (event) {
    !isTouch(event) && event.preventDefault();
};
var isInvalid = function (event, hasTouch) {
    return hasTouch && !isTouch(event);
};
var InteractiveBase = function (_a) {
    var onMove = _a.onMove, onKey = _a.onKey, rest = __rest(_a, ["onMove", "onKey"]);
    var container = useRef(null);
    var onMoveCallback = useEventCallback(onMove);
    var onKeyCallback = useEventCallback(onKey);
    var touchId = useRef(null);
    var hasTouch = useRef(false);
    var _b = useMemo(function () {
        var handleMoveStart = function (_a) {
            var nativeEvent = _a.nativeEvent;
            var el = container.current;
            if (!el)
                return;
            preventDefaultMove(nativeEvent);
            if (isInvalid(nativeEvent, hasTouch.current) || !el)
                return;
            if (isTouch(nativeEvent)) {
                hasTouch.current = true;
                var changedTouches = nativeEvent.changedTouches || [];
                if (changedTouches.length)
                    touchId.current = changedTouches[0].identifier;
            }
            el.focus();
            onMoveCallback(getRelativePosition(el, nativeEvent, touchId.current));
            toggleDocumentEvents(true);
        };
        var handleMove = function (event) {
            preventDefaultMove(event);
            var isDown = isTouch(event) ? event.touches.length > 0 : event.buttons > 0;
            if (isDown && container.current) {
                onMoveCallback(getRelativePosition(container.current, event, touchId.current));
            }
            else {
                toggleDocumentEvents(false);
            }
        };
        var handleMoveEnd = function () { return toggleDocumentEvents(false); };
        var handleKeyDown = function (event) {
            var keyCode = event.which || event.keyCode;
            if (keyCode < 37 || keyCode > 40)
                return;
            event.preventDefault();
            onKeyCallback({
                left: keyCode === 39 ? 0.05 : keyCode === 37 ? -0.05 : 0,
                top: keyCode === 40 ? 0.05 : keyCode === 38 ? -0.05 : 0,
            });
        };
        function toggleDocumentEvents(state) {
            var touch = hasTouch.current;
            var el = container.current;
            var parentWindow = getParentWindow(el);
            var toggleEvent = state ? parentWindow.addEventListener : parentWindow.removeEventListener;
            toggleEvent(touch ? 'touchmove' : 'mousemove', handleMove);
            toggleEvent(touch ? 'touchend' : 'mouseup', handleMoveEnd);
        }
        return [handleMoveStart, handleKeyDown, toggleDocumentEvents];
    }, [onKeyCallback, onMoveCallback]), handleMoveStart = _b[0], handleKeyDown = _b[1], toggleDocumentEvents = _b[2];
    useEffect(function () { return toggleDocumentEvents; }, [toggleDocumentEvents]);
    return (_jsx("div", __assign({}, rest, { onTouchStart: handleMoveStart, onMouseDown: handleMoveStart, className: cx('interactiveArea'), ref: container, onKeyDown: handleKeyDown, tabIndex: 0, role: "slider" })));
};
export var Interactive = React.memo(InteractiveBase);
