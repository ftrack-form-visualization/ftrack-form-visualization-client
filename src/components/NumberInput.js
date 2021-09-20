import React from 'react';
import {InputNumber} from "antd";

const NumberInput = (props) => {
  return (
    <div>
      <InputNumber min={props.min} max={props.max}
                   defaultValue={props.default}/>
    </div>
  );
};

export default NumberInput;
