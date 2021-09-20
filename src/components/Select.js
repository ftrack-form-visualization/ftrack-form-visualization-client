import React from 'react';
import {Select} from "antd";

const {Option} = Select

const SelectComponent = (props) => {
  return (
    <Select placeholder={props.placeholder}>
      {
        props.list.map(item => (
          <Option value={item.value}>{item.value}</Option>
        ))
      }
    </Select>
  );
};

export default SelectComponent;
