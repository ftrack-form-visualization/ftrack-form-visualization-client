import React from 'react';
import {DatePicker} from "antd";

const DatePickerComponent = (props) => {
  const dateChanged = (date, dateString) => {
    if (props.callback) {
      props.callback({name: props.name, value: dateString})
    }
  }

  return (
    <div>
      <DatePicker
        onChange={(date, dateString) => dateChanged(date, dateString)}/>
    </div>
  );
};

export default DatePickerComponent;
