import React from 'react';
import {Select} from "antd";

const {Option} = Select

const SelectComponent = (props) => {
  const selectChanged = value => {
    if (props.callback) {
      props.callback({name: props.name, value})
    }
  }
  return (
    <Select placeholder={props.placeholder}
            onChange={value => selectChanged(value)}>
      {
        props.list.map((item, index) =>
          <Option value={item} key={index}>{item}</Option>
        )
      }
    </Select>
  );
};

export default SelectComponent;
