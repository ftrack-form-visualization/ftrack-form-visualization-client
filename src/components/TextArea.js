import React from 'react';
import {Input} from 'antd'

const {TextArea} = Input

const TextAreaComponent = (props) => {
  return (
    <TextArea placeholder={props.placeholder} defaultValue={props.default}/>
  );
};

export default TextAreaComponent;
