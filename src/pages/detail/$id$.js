import React, {Component} from 'react';
import {Form, Button} from 'antd'
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
      <div style={{
        display: 'flex',
        backgroundColor: '#282c34',
      }}>
        <Form className={styles.container} labelCol={{span: 4}}
              wrapperCol={{span: 20}}>
          {templates.map((item, index) => (
            <FormItem label={<p
              style={{
                paddingTop: 9,
                color: '#935ba2',
                fontWeight: 'bold'
              }}>{item.title}</p>} key={item.name}>
              {this.makeComponent({
                ...item, callback: data => this.handleValueChanged(data)
              })}
            </FormItem>
          ))}
          <FormItem wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary"
                    style={{width: '100px'}}
                    size="large"
                    onClick={() => this.handleSubmit()}>提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  handleValueChanged(data) {
    console.log(data)
  }

  handleSubmit() {
  }
}

export default connect(({detail}) => ({...detail}))($Id$);
