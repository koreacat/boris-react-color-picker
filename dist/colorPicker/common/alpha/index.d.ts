/// <reference types="react" />
import { HsvaColor } from "../../types";
interface Props {
    hsva: HsvaColor;
    onChange: (newAlpha: {
        a: number;
    }) => void;
}
export declare const Alpha: ({ hsva, onChange }: Props) => JSX.Element;
export {};
