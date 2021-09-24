import React, {Component} from 'react';
import {Form} from 'antd'
import {connect} from 'dva'

import TextInput from "@/components/TextInput";
import Switch from "@/components/Switch";
import NumberInput from "@/components/NumberInput";
import DatePicker from "@/components/DatePicker";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import CheckboxGroup from "@/components/CheckboxGroup";

import styles from './styles.scss'


const FormItem = Form.Item

class $Id$ extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
  }

  componentDidMount() {
    this.props.dispatch({type: 'detail/initData', id: this.id})
  }

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
  }

  render() {
    const {templates} = this.props
    return (
      <Form className={styles.container}>
        {templates.map((item, index) => (
          // todo 设置样式
          <FormItem label={item.title}>
            {this.makeComponent(item)}
          </FormItem>
        ))}
      </Form>
    );
  }
}

export default connect(({detail}) => ({...detail}))($Id$);
