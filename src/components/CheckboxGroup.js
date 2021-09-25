import React, {useState} from 'react';
import {Checkbox} from 'antd'

const CheckboxGroupComponent = (props) => {
  let initData = {}
  for (let i = 0; i < props.list.length; i++) {
    initData[props.list[i]] = props.checkedList.indexOf(props.list[i]) !== -1
  }

  const [checkData, setCheckData] = useState(initData)

  const checkboxChanged = (event, name) => {
    let data = JSON.parse(JSON.stringify(checkData))
    data[name] = event.target.checked
    setCheckData(data)

    if (props.callback) {
      let checkedList = []
      for (let n in data) {
        if (data[n]) {
          checkedList.push(n)
        }
      }
      props.callback({name: props.name, value: checkedList})
    }
  }

  return (
    <div>
      {props.list.map((item, index) => (
        <Checkbox style={{color: '#935ba2'}}
                  key={index}
                  checked={checkData[item]}
                  onChange={e => checkboxChanged(e, item)}>{item}
        </Checkbox>))}
    </div>
  )
};

export default CheckboxGroupComponent;
