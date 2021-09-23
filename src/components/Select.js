import React from 'react';
import {Select} from "antd";

const {Option} = Select

const SelectComponent = (props) => {
  return (
    <Select placeholder={props.placeholder}>
      {
        props.list.map((item, index) =>
          <Option value={item} key={index}>{item}</Option>
        )
      }
    </Select>
  );
};

export default SelectComponent;
