import React from 'react';
import {Checkbox} from 'antd'

const CheckboxGroup = Checkbox.Group;

const CheckboxGroupComponent = (props) => {
  return <CheckboxGroup options={props.list} value={props.checkedList}/>
};

export default CheckboxGroupComponent;
