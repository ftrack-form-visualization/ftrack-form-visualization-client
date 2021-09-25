import React, {Component, Fragment} from 'react';
import {Form, Input, Switch, List, Button, Icon, InputNumber} from "antd";
import {connect} from 'dva'

const FormItem = Form.Item

class ComponentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {list: [], checkedList: []}
  }

  componentDidMount() {
    this.setState({list: this.props.item.list})
    if (this.props.item.type === 'CheckboxGroup') {
      this.setState({checkedList: this.props.item.checkedList})
    }
  }

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

          {!['Switch', 'DatePicker', 'CheckboxGroup'].includes(item.type) ?
            <FormItem label='占位符'>
              {this.inputComponent(item.placeholder, '请设置placeholder', 'placeholder')}
            </FormItem> : null}

          {!['DatePicker', 'Select', 'Switch', 'CheckboxGroup'].includes(item.type) ?
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
            <FormItem label='自适应高度'>
              <Switch defaultChecked={item.autoSize}
                      onChange={e => this.handleChange('autoSize', e, true)}/>
            </FormItem> : null}

          {item.type === 'Select' ?
            <FormItem label='默认值'>
              <div style={{position: 'relative', height: 20}}>
                <Button type='primary'
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0
                        }} onClick={() => this.onSelectAdd()}>添加默认值</Button>
              </div>
              <List dataSource={this.state.list}
                    style={{marginTop: 20}}
                    renderItem={(item, index) => <List.Item key={index}>
                      <Input value={item} style={{marginRight: 10}}
                             onChange={e => this.onListInputChanged(index, e)}/>
                      <Button type='primary'
                              onClick={() => this.onSelectItemDel(index)}>删除</Button>
                    </List.Item>}
                    bordered/>
            </FormItem> : null}

          {item.type === 'CheckboxGroup' ?
            <FormItem label='默认值'>
              <div style={{position: 'relative', height: 20}}>
                <Button type='primary'
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0
                        }} onClick={() => this.onSelectAdd()}>添加默认值</Button>
              </div>
              <List dataSource={this.state.list}
                    style={{marginTop: 20}}
                    renderItem={(item, index) => <List.Item key={index}>
                      <Input value={item} style={{marginRight: 10}}
                             onChange={e => this.onListInputChanged(index, e)}/>
                      <Switch checkedChildren={<Icon type="check"/>}
                              unCheckedChildren={<Icon type="close"/>}
                              defaultChecked={this.state.checkedList.indexOf(item) !== -1}
                              style={{marginRight: 10}}
                              onChange={(checked) => this.onCheckboxSwitchChanged(checked, item)}/>
                      <Button type='primary'
                              onClick={() => this.onCheckboxDel(index, item)}>删除</Button>
                    </List.Item>}
                    bordered/>
            </FormItem> : null}

          {item.type === 'NumberInput' ? <Fragment>
            <FormItem label='最小值'>
              <InputNumber defaultValue={item.min}
                           onChange={e => this.handleChange('min', e, true)}/>
            </FormItem>
            <FormItem label='最大值'>
              <InputNumber defaultValue={item.max}
                           onChange={e => this.handleChange('max', e, true)}/>
            </FormItem>
          </Fragment> : null}
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

  onCheckboxSwitchChanged(checked, item) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    templates.map(v => {
      if (v.id === this.props.item.id) {
        if (checked) {
          v.checkedList.push(item)
        } else {
          if (v.checkedList.indexOf(item) !== -1) {
            v.checkedList.splice(v.checkedList.indexOf(item), 1)
          }
        }
      }
      return v
    })
    if (checked) {
      this.setState({checkedList: [...this.state.checkedList, item]})
    } else {
      let checkedList = JSON.parse(JSON.stringify(this.state.checkedList))
      if (checkedList.indexOf(item) !== -1) {
        checkedList.splice(checkedList.indexOf(item), 1)
        this.setState({checkedList})
      }
    }
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }

  onSelectAdd() {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    templates.map(v => {
      if (v.id === this.props.item.id) {
        v.list.push('')
      }
      return v
    })
    this.setState({list: [...this.state.list, '']})
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }

  onCheckboxDel(index, item) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    templates.map(v => {
      if (v.id === this.props.item.id) {
        v.list.splice(index, 1)
        if (v.checkedList.indexOf(item) !== -1) {
          v.checkedList.splice(v.checkedList.indexOf(item), 1)
        }
      }
      return v
    })

    let list = JSON.parse(JSON.stringify(this.state.list))
    let checkedList = JSON.parse(JSON.stringify(this.state.checkedList))
    list.splice(index, 1)
    if (checkedList.indexOf(item) !== -1) {
      checkedList.splice(checkedList.indexOf(item), 1)
    }
    this.setState({list, checkedList})
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }

  onSelectItemDel(index) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    templates.map(v => {
      if (v.id === this.props.item.id) {
        v.list.splice(index, 1)
      }
      return v
    })

    let list = JSON.parse(JSON.stringify(this.state.list))
    list.splice(index, 1)
    this.setState({list})
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }

  onListInputChanged(index, e) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    templates.map(v => {
      if (v.id === this.props.item.id) {
        v.list[index] = e.target.value
      }
      return v
    })

    let list = JSON.parse(JSON.stringify(this.state.list))
    list[index] = e.target.value
    this.setState({list})
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }
}

export default connect(({edit}) => ({...edit}))(ComponentForm);
