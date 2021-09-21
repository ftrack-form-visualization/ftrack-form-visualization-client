import React from 'react';
import {Input} from 'antd'

const {TextArea} = Input

const TextAreaComponent = (props) => {
  return (
    <TextArea placeholder={props.placeholder} defaultValue={props.default}
              key={`${props.default} ${props.autoSize}`}
              autoSize={props.autoSize ? props.autoSize : {minRows: 6}}/>
  );
};

export default TextAreaComponent;
