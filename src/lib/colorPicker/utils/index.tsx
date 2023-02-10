import {hexToRgba} from "./convert";
import {ObjectColor} from "../types";

export const clamp = (number: number, min = 0, max = 1): number => {
  return number > max ? max : number < min ? min : number;
};

export const round = (number: number, digits = 0, base = Math.pow(10, digits)): number => {
  return Math.round(base * number) / base;
};

export const equalColorObjects = (first: ObjectColor, second: ObjectColor): boolean => {
  if (first === second) return true;

  for (const prop in first) {
    if ((first as unknown as Record<string, number>)[prop] !== (second as unknown as Record<string, number>)[prop])
      return false;
  }

  return true;
};

export const equalHex = (first: string, second: string): boolean => {
  if (first.toLowerCase() === second.toLowerCase()) return true;
  return equalColorObjects(hexToRgba(first), hexToRgba(second));
};
