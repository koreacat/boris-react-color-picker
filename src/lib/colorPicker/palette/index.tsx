import React from 'react';
import {ColorPickerBaseProps, RgbaColor} from "../types";
import {hexToRgba, rgbaToHex} from "../utils/convert";
import classNames from 'classnames/bind';
import style from './Palette.module.scss';
const cx = classNames.bind(style);

const dummyColos = [
  '#FFFFFF',
  '#F1F3F5',
  '#DEE2E6',
  '#ADB5BD',
  '#868E96',
  '#343A40',
  '#212529',
  '#FA5252',
  '#E64980',
  '#BE4BDB',
  '#7950F2',
  '#4C6EF5',
  '#228BE6',
  '#15AABF',
];

interface CheckProps {
  isWhite: boolean;
}

const Check = ({ isWhite }: CheckProps) => {
  const fill = isWhite ? '#CED4DA' : 'white';

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.66888 12.4506H7.64641C7.50026 12.4475 7.35623 12.4149 7.22289 12.355C7.08954 12.2951 6.96956 12.209 6.87013 12.1019L4.03516 9.0381L4.9689 8.17187L7.67264 11.0894L13.0501 5.73438L13.9501 6.63814L8.4339 12.1319C8.3339 12.2331 8.21477 12.3134 8.08344 12.3681C7.9521 12.4228 7.81117 12.4509 7.66888 12.4506Z"
        fill={fill}
      />
    </svg>
  );
};

const Palette = ({ color, onChange }: ColorPickerBaseProps<RgbaColor>) => {
  const isWhite = (color: string) =>
    color === '#FFFFFF' || color === '#FFF' || color === '#ffffff' || color === '#fff' || color === 'white';

  const isCheck = (selectedColor: string) => {
    return selectedColor === rgbaToHex(color).toUpperCase();
  };

  const handleClick = (color: string) => {
    onChange(hexToRgba(color));
  };

  const getPaletteEls = () =>
    dummyColos.map((color, index) => {
      return (
        <div
          key={index}
          className={cx('palette', { white: isWhite(color) })}
          style={{ backgroundColor: color }}
          onClick={() => handleClick(color)}
        >
          {isCheck(color) && <Check isWhite={isWhite(color)} />}
        </div>
      );
    });

  return <div className={cx('paletteWrap')}>{getPaletteEls()}</div>;
};

export default Palette;
