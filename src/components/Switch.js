import React from 'react';
import {Switch} from "antd";

const SwitchComponent = (props) => {
  const handleChanged = (checked) => {
    if (props.callback) {
      props.callback({name: props.name, value: checked})
    }
  }

  return (
    <Switch checkedChildren={props.checkedText}
            unCheckedChildren={props.uncheckedText}
            defaultChecked={props.default} key={props.default}
            onChange={checked => handleChanged(checked)}/>
  );
};

export default SwitchComponent;
