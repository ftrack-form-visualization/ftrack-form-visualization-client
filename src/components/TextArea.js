import React from 'react';
import {Input} from 'antd'

const {TextArea} = Input

const TextAreaComponent = (props) => {
  const textChanged = e => {
    if (props.callback) {
      props.callback({name: props.name, value: e.target.value})
    }
  }

  return (
    <TextArea placeholder={props.placeholder} defaultValue={props.default}
              key={`${props.default} ${props.autoSize}`}
              autoSize={props.autoSize ? props.autoSize : {minRows: 6}}
              onChange={event => textChanged(event)}/>
  );
};

export default TextAreaComponent;
