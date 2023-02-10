import React, { useRef } from 'react';
import { Saturation } from './common/saturation';
import {ColorModel, ColorPickerBaseProps, RgbaColor} from "./types";
import {hsvaToRgba, rgbaToHsva} from "./utils/convert";
import {equalColorObjects} from "./utils";
import {useColorManipulation} from "./hooks/useColorManipulation";
import {Hue} from "./common/hue";
import {Alpha} from "./common/alpha";
import ColorInput from "./colorInput";
import Palette from "./palette";
import classNames from 'classnames/bind';
import style from './ColorPicker.module.scss';
const cx = classNames.bind(style);

const colorModel: ColorModel<RgbaColor> = {
  defaultColor: { r: 0, g: 0, b: 0, a: 1 },
  toHsva: rgbaToHsva,
  fromHsva: hsvaToRgba,
  equal: equalColorObjects,
};

const ColorPicker = ({ color, onChange, ...rest }: ColorPickerBaseProps<RgbaColor>) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [hsva, updateHsva] = useColorManipulation(colorModel, color, onChange);

  return (
    <div {...rest} ref={nodeRef} className={cx('area')}>
      <Saturation hsva={hsva} onChange={updateHsva} />

      <div className={cx('controlArea')}>
        <div className={cx('controlWrap')}>
          <Hue hue={hsva.h} onChange={updateHsva} />
          <Alpha hsva={hsva} onChange={updateHsva} />
        </div>

        <ColorInput color={color} onChange={onChange} />

        <Palette color={color} onChange={onChange} />
      </div>
    </div>
  );
};

export default ColorPicker;
