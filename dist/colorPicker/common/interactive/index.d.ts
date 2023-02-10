import React from 'react';
export interface Interaction {
    left: number;
    top: number;
}
interface Props {
    onMove: (interaction: Interaction) => void;
    onKey: (offset: Interaction) => void;
    children: React.ReactNode;
}
export declare const Interactive: React.MemoExoticComponent<({ onMove, onKey, ...rest }: Props) => JSX.Element>;
export {};
