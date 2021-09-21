import React from 'react';
import {Input} from "antd";


const TextInput = (props) => {
  return (
    <Input defaultValue={props.default} placeholder={props.placeholder}
           key={props.default}/>
  );
};

export default TextInput;
