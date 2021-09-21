import React from 'react';
import {Input} from "antd";



const TextInput = (props) => {
  return (
      <Input defaultValue={props.value} placeholder={props.placeholder}/>
  );
};

export default TextInput;
