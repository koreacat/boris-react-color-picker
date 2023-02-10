import React, { useState } from "react";
import {ColorPicker} from "../lib";

const Test = () => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1});

  return (
    <div>
      <ColorPicker color={color} onChange={setColor}/>
    </div>
  )
}

export default Test;