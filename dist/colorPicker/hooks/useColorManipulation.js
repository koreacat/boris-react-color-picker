import { useState, useEffect, useCallback, useRef } from 'react';
import { equalColorObjects } from '../utils';
import { useEventCallback } from './useEventCallback';
export function useColorManipulation(colorModel, color, onChange) {
    var onChangeCallback = useEventCallback(onChange);
    var _a = useState(function () { return colorModel.toHsva(color); }), hsva = _a[0], updateHsva = _a[1];
    var cache = useRef({ color: color, hsva: hsva });
    useEffect(function () {
        if (!colorModel.equal(color, cache.current.color)) {
            var newHsva = colorModel.toHsva(color);
            cache.current = { hsva: newHsva, color: color };
            updateHsva(newHsva);
        }
    }, [color, colorModel]);
    useEffect(function () {
        var newColor;
        if (!equalColorObjects(hsva, cache.current.hsva) &&
            !colorModel.equal((newColor = colorModel.fromHsva(hsva)), cache.current.color)) {
            cache.current = { hsva: hsva, color: newColor };
            onChangeCallback(newColor);
        }
    }, [hsva, colorModel, onChangeCallback]);
    var handleChange = useCallback(function (params) {
        updateHsva(function (current) { return Object.assign({}, current, params); });
    }, []);
    return [hsva, handleChange];
}
