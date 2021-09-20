import React from 'react';
import {Input, Form} from "antd";



const TextInput = (props) => {
  return (
      <Input defaultValue={props.value} placeholder={props.placeholder}/>
  );
};

export default TextInput;
