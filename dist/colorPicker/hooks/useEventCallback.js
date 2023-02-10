import { useRef } from 'react';
export function useEventCallback(handler) {
    var callbackRef = useRef(handler);
    var fn = useRef(function (value) {
        callbackRef.current && callbackRef.current(value);
    });
    callbackRef.current = handler;
    return fn.current;
}
