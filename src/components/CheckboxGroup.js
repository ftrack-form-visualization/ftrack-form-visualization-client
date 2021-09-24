import React from 'react';
import {Checkbox} from 'antd'

const CheckboxGroupComponent = (props) => {
  return (
    <div>
      {/*todo 修改字体颜色*/}
      {props.list.map(item => (
        <Checkbox value={item} style={{color: 'white'}}
                  checked={props.checkedList.indexOf(item) !== -1}>{item}
        </Checkbox>))}
    </div>
  )
};

export default CheckboxGroupComponent;
