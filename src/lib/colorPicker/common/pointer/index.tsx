import React from 'react';
import classNames from 'classnames/bind';
import style from './Pointer.module.scss';
const cx = classNames.bind(style);

interface Props {
  className?: string;
  top?: number;
  left: number;
}

export const Pointer = ({ className, left, top = 0.5 }: Props): JSX.Element => {
  const style = {
    top: `${top * 100}%`,
    left: `${left * 100}%`,
  };

  return <div className={cx('pointer', className)} style={style} />;
};
