import React from 'react';
import {InputNumber} from "antd";

const NumberInput = (props) => {
  const handleChanged = (value) => {
    if (props.callback) {
      props.callback({name: props.name, value})
    }
  }

  return (
    <div>
      <InputNumber min={props.min} max={props.max}
                   defaultValue={props.default} key={props.default}
                   onChange={e => handleChanged(e)}/>
    </div>
  );
};

export default NumberInput;
