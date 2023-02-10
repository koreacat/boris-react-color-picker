import React, { useEffect, useState } from 'react';
import {ColorPickerBaseProps, RgbaColor} from "../types";
import {alphaToPer, aToHex, hexToRgba, rgbToHex} from "../utils/convert";
import classNames from 'classnames/bind';
import style from './ColorInput.module.scss';
const cx = classNames.bind(style);

const ColorInput = ({ color, onChange }: ColorPickerBaseProps<RgbaColor>) => {
  const [colorText, setColorText] = useState(rgbToHex(color));
  const [alphaText, setAlphaText] = useState(alphaToPer(color.a));

  useEffect(() => {
    setColorText(rgbToHex(color));
    setAlphaText(alphaToPer(color.a));
  }, [color]);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlurColor();
      handleBlurAlpha();
    }
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorText(e.target.value);
  };

  const handleBlurColor = () => {
    // 입력 받은 결과에서 숫자, a-f 를 제외한 문자를 제거 후, 앞에서 부터 6자리를 자릅니다.
    const result = colorText.replace(/[^a-fA-F0-9]+/g, '').slice(0, 6);

    // 앞에서 자른 6자리의 문자열이 rgb Hex 형식인지 테스트합니다.
    const isHexText = /^[0-9A-Fa-f]{6}$/.test(result);

    // 결과가 hex 형식인 경우 color와 colorText를 변경합니다.
    if (isHexText) {
      setColorText(result);
      onChange(hexToRgba(result + aToHex(color.a)));
    }
    // 결과가 hex 형식이 아닌 경우 원래의 color로 되돌아갑니다.
    else {
      setColorText(rgbToHex(color));
    }
  };

  const handleChangeAlpha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlphaText(e.target.value);
  };

  const handleBlurAlpha = () => {
    // 입력 받은 결과에서 숫자를 제외한 문자를 제거 후, 앞에서 부터 3자리를 자릅니다.
    const result = alphaText.replace(/[^0-9]+/g, '').slice(0, 3);

    if (result) {
      setAlphaText(result + '%');
      onChange(hexToRgba(colorText + aToHex(Number(result) / 100)));
    } else {
      setAlphaText(alphaToPer(color.a));
    }
  };

  return (
    <div className={cx('inputWrap')}>
      <input
        className={cx('input')}
        type={'text'}
        value={colorText}
        onChange={handleChangeColor}
        onBlur={handleBlurColor}
        onKeyDown={handleKeydown}
      />
      <input
        className={cx('input', 'alpha')}
        type={'text'}
        value={alphaText}
        onChange={handleChangeAlpha}
        onBlur={handleBlurAlpha}
        onKeyDown={handleKeydown}
      />
    </div>
  );
};

export default ColorInput;
