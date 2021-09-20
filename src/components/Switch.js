import React from 'react';
import {Switch} from "antd";

const SwitchComponent = (props) => {
  return (
    <div>
      <Switch checkedChildren={props.checkedText}
              unCheckedChildren={props.uncheckedText}
              defaultChecked={props.default}/>
    </div>
  );
};

export default SwitchComponent;
