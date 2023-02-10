import { ColorModel, AnyColor, HsvaColor } from '../types';
export declare function useColorManipulation<T extends AnyColor>(colorModel: ColorModel<T>, color: T, onChange?: (color: T) => void): [HsvaColor, (color: Partial<HsvaColor>) => void];
