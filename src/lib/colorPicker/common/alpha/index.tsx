import React from 'react';
import {HsvaColor} from "../../types";
import {Interaction, Interactive} from "../interactive";
import {clamp, round} from "../../utils";
import {hsvaToHslaString} from "../../utils/convert";
import {Pointer} from "../pointer";
import classNames from 'classnames/bind';
import style from './Alpha.module.scss';
const cx = classNames.bind(style);

interface Props {
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }) => void;
}

export const Alpha = ({ hsva, onChange }: Props): JSX.Element => {
  const handleMove = (interaction: Interaction) => {
    onChange({ a: interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    onChange({ a: clamp(hsva.a + offset.left) });
  };

  const colorFrom = hsvaToHslaString(Object.assign({}, hsva, { a: 0 }));
  const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
  };

  const ariaValue = round(hsva.a * 100);

  return (
    <div className={cx('alphaArea')}>
      <div className={cx('alphaGradient')} style={gradientStyle} />
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${ariaValue}%`}
        aria-valuenow={ariaValue}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <Pointer className={cx('pointer')} left={hsva.a} />
      </Interactive>
    </div>
  );
};
