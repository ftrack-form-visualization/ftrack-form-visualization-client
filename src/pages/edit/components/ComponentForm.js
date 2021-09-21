import React, {Component, Fragment} from 'react';
import {Form, Input, Switch} from "antd";
import {connect} from 'dva'

const FormItem = Form.Item

class ComponentForm extends Component {
  inputComponent(value, placeholder, key) {
    return <Input placeholder={placeholder} defaultValue={value}
                  onChange={e => this.handleChange(key, e)}/>
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <Form labelCol={{span: 4}} wrapperCol={{span: 20}}>
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

          {!['Switch', 'DatePicker'].includes(item.type) ?
            <FormItem label='占位符'>
              {this.inputComponent(item.placeholder, '请设置placeholder', 'placeholder')}
            </FormItem> : null}

          {!['DatePicker', 'Select', 'Switch'].includes(item.type) ?
            <FormItem label='默认值'>
              {this.inputComponent(item.default, '请设置默认值', 'default')}
            </FormItem> : null}

          {item.type === 'Switch' ? (
            <Fragment>
              <FormItem label='默认值'>
                <Switch defaultChecked={item.default}
                        onChange={e => this.handleChange('default', e, true)}/>
              </FormItem>
              <FormItem label='开启的文字'>
                {this.inputComponent(item.checkedText, '请设置开启时使用的文字', 'checkedText')}
              </FormItem>
              <FormItem label='关闭的文字'>
                {this.inputComponent(item.uncheckedText, '请设置关闭时使用的文字', 'uncheckedText')}
              </FormItem>
            </Fragment>
          ) : null}

          {item.type === 'TextArea' ?
            <FormItem label = '自适应高度'>
              <Switch defaultChecked={item.autoSize}
                      onChange={e => this.handleChange('autoSize', e, true)}/>
            </FormItem> : null}
        </Form>
      </div>
    );
  }

  handleChange(key, event, userEvent = false) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    let value = event
    if (!userEvent) {
      value = event.target.value
    }
    templates.map(v => {
      if (v.id === this.props.item.id) {
        v[key] = value
      }
      return v
    })
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }
}

export default connect(({edit}) => ({...edit}))(ComponentForm);
