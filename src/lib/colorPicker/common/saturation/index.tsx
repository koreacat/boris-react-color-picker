import React from 'react';
import { HsvaColor } from '../../types';
import { hsvaToHslString } from '../../utils/convert';
import { clamp, round } from '../../utils';
import { Pointer } from '../pointer';
import {Interaction, Interactive} from "../interactive";
import classNames from 'classnames/bind';
import style from './Saturation.module.scss';
const cx = classNames.bind(style);

interface Props {
  hsva: HsvaColor;
  onChange: (newColor: { s: number; v: number }) => void;
}

const SaturationBase = ({ hsva, onChange }: Props) => {
  const handleMove = (interaction: Interaction) => {
    onChange({
      s: interaction.left * 100,
      v: 100 - interaction.top * 100,
    });
  };

  const handleKey = (offset: Interaction) => {
    onChange({
      s: clamp(hsva.s + offset.left * 100, 0, 100),
      v: clamp(hsva.v - offset.top * 100, 0, 100),
    });
  };

  const containerStyle = {
    backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
  };

  return (
    <div className={cx('saturationArea')} style={containerStyle}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Color"
        aria-valuetext={`Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`}
      >
        <Pointer className={cx('pointer')} top={1 - hsva.v / 100} left={hsva.s / 100} />
      </Interactive>
    </div>
  );
};

export const Saturation = React.memo(SaturationBase);
