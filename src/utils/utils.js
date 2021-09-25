import React from 'react';

import TextInput from '@/components/TextInput';
import NumberInput from "@/components/NumberInput";
import Switch from '@/components/Switch';
import DatePicker from '@/components/DatePicker'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import CheckboxGroup from '@/components/CheckboxGroup'

export default {
  makeComponent(data) {
    if (data.type === 'TextInput') {
      return <TextInput {...data}/>
    } else if (data.type === 'Switch') {
      return <Switch {...data}/>
    } else if (data.type === 'NumberInput') {
      return <NumberInput {...data} />
    } else if (data.type === 'DatePicker') {
      return <DatePicker {...data}/>
    } else if (data.type === 'Select') {
      return <Select {...data}/>
    } else if (data.type === 'TextArea') {
      return <TextArea {...data}/>
    } else if (data.type === 'CheckboxGroup') {
      return <CheckboxGroup {...data}/>
    }
  },
  swapArray(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  // 上移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
  moveUp(arr, index) {
    return this.swapArray(arr, index, index - 1);
  },
  // 下移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
  moveDown(arr, index) {
    return this.swapArray(arr, index, index + 1);
  }
}
