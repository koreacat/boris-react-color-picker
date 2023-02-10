import React from 'react';
import { HsvaColor } from '../../types';
interface Props {
    hsva: HsvaColor;
    onChange: (newColor: {
        s: number;
        v: number;
    }) => void;
}
export declare const Saturation: React.MemoExoticComponent<({ hsva, onChange }: Props) => JSX.Element>;
export {};
