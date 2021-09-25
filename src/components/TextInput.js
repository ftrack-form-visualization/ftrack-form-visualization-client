import React from 'react';
import {Input} from "antd";


const TextInput = (props) => {
  const handleChange = (e) => {
    if(props.callback){
      props.callback({name:props.name,value : e.target.value})
    }
  }

  return (
    <Input defaultValue={props.default} placeholder={props.placeholder}
           key={props.default} onChange={e => handleChange(e)}/>
  );
};

export default TextInput;
