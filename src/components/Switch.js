import React from 'react';
import {Switch} from "antd";

const SwitchComponent = (props) => {
  return (
    <Switch checkedChildren={props.checkedText}
            unCheckedChildren={props.uncheckedText}
            defaultChecked={props.default} key={props.default}/>
  );
};

export default SwitchComponent;
