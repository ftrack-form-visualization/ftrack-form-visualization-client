import React, {Component} from 'react';
import {Form, Input} from "antd";
import {connect} from 'dva'

const FormItem = Form.Item

class ComponentForm extends Component {
  Placeholder(value) {
    return <Input placeholder='设置placeholder' defaultValue={value}
                  onChange={e => this.handleChange('placeholder', e)}/>
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <Form labelCol={{span: 3}} wrapperCol={{span: 21}}>
          <FormItem label='字段名'>
            <Input placeholder='会当作返回给事件服务器的key值'
                   defaultValue={item.name}
                   onChange={e => this.handleChange('name', e)}/>
          </FormItem>
          <FormItem label='标题'>
            <Input placeholder='请输入标题'
                   defaultValue={item.title}
                   onChange={e => this.handleChange('title', e)}/>
          </FormItem>
          {!['Switch', 'DatePicker'].includes(this.props.item.type) ?
            <FormItem label='占位符'>
              {this.Placeholder(item.placeholder)}
            </FormItem> : null}
        </Form>
      </div>
    );
  }

  handleChange(key, event) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    templates.map(v => {
      if (v.id === this.props.item.id) {
        v[key] = event.target.value
      }
      return v
    })
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }
}

export default connect(({edit}) => ({...edit}))(ComponentForm);
