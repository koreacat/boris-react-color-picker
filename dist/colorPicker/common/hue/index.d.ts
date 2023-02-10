import React from 'react';
interface Props {
    hue: number;
    onChange: (newHue: {
        h: number;
    }) => void;
}
export declare const Hue: React.MemoExoticComponent<({ hue, onChange }: Props) => JSX.Element>;
export {};
