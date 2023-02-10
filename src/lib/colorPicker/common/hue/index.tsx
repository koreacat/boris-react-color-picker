import React from 'react';
import { clamp, round } from '../../utils';
import { Pointer } from '../pointer';
import {Interaction, Interactive} from "../interactive";
import classNames from 'classnames/bind';
import style from './Hue.module.scss';
const cx = classNames.bind(style);

interface Props {
  hue: number;
  onChange: (newHue: { h: number }) => void;
}

const HueBase = ({ hue, onChange }: Props) => {
  const handleMove = (interaction: Interaction) => {
    onChange({ h: 360 * interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    onChange({
      h: clamp(hue + offset.left * 360, 0, 360),
    });
  };

  return (
    <div className={cx('hueArea')}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Hue"
        aria-valuenow={round(hue)}
        aria-valuemax="360"
        aria-valuemin="0"
      >
        <Pointer className={cx('pointer')} left={hue / 360} />
      </Interactive>
    </div>
  );
};

export const Hue = React.memo(HueBase);
