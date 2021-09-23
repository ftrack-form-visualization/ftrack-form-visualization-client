/**
 * title: 编辑表单
 */
import React, {Component} from 'react';
import {Row, Col, Card, Icon, Input, Button, Form, Message, Modal} from "antd";
import {connect} from 'dva'
import {router} from 'umi'
import uuid from 'short-uuid'

import utils from "@/utils/utils";
import TextInput from '@/components/TextInput';
import NumberInput from "@/components/NumberInput";
import Switch from '@/components/Switch';
import DatePicker from '@/components/DatePicker'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import CheckboxGroup from '@/components/CheckboxGroup'

import styles from './index.scss'
import ComponentForm from "./components/ComponentForm";


class $Id$ extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id || ''
  }

  componentDidMount() {
    this.props.dispatch({type: 'edit/fetch', id: this.id})
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
    const {components, templates, checkedItem} = this.props
    const FormItem = Form.Item

    return (
      <div style={{padding: '10px 20px', backgroundColor: '#eeeeee'}}>
        <Row>
          <Col style={{marginBottom: 10}}>
            <div
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
              <Input placeholder="请输入表单名"
                     style={{width: 260, marginRight: 10}}
                     defaultValue={this.props.formName}
                     onChange={e => this.onFormNameChanged(e)}/>
              <Button type='primary' style={{marginRight: 20}}
                      onClick={() => this.onFormSubmit()}>保存表单</Button>
            </div>
          </Col>
        </Row>

        <Row gutter={20}>
          {/*组件菜单*/}
          <Col span={7}>
            <Card title='组件列表' bordered={false} style={{height: '86vh'}}>
              <Row gutter={20}>
                {
                  components.map(item => (
                    <Col span={12} key={item.title} style={{margin: '10px 0'}}>
                      <Card style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }} onClick={() => this.onComponentClick(item)}>
                        <Icon type={item.icon} style={{
                          fontSize: 22,
                          color: '#1890ff',
                          marginRight: 8
                        }}/>
                        <span style={{fontSize: 16}}>{item.title}</span>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </Card>
          </Col>

          {/*中间区域*/}
          <Col span={10}>
            <Card bordered={false}
                  style={{height: '86vh', padding: 26, overflowY: 'auto'}}>
              <Form labelCol={{span: 3}} wrapperCol={{span: 21}}>
                {
                  templates.map((item, index) => {
                    const ToolBox = () => (
                      <div className={styles['checked-box-btn']}>
                        <Icon type="caret-up"
                              className={index === 0 ? styles['i-disabled'] : styles['icon']}
                              onClick={event => this.moveUp(index, event)}/>
                        <Icon type="caret-down"
                              className={index === templates.length - 1 ? styles['i-disabled'] : styles['icon']}
                              onClick={(event => this.moveDown(index, event))}/>
                        <Icon type="delete" className={styles.icon}
                              onClick={event => this.deleteComponent(item, event)}/>
                      </div>
                    )
                    return (
                      <div key={item.id} className={`${styles['checked-box']}
                       ${checkedItem && checkedItem.id === item.id ? styles['checked-box-active'] : ''}`}
                           onClick={() => this.handleCheckedComponent(item)}>
                        {checkedItem && checkedItem.id === item.id ?
                          <ToolBox/> : null}
                        {/*组件*/}
                        <FormItem label={item.title} name={item.name}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '6px 0'
                                  }}>
                          {this.makeComponent(item)}
                        </FormItem>
                      </div>
                    )
                  })
                }
              </Form>
            </Card>
          </Col>

          {/*右侧区域*/}
          <Col span={7}>
            <Card style={{height: '86vh', overflowY: 'auto'}} title='配置组件'>
              {checkedItem ?
                // 切换不同的组件,需要重新渲染ComponentForm
                <div key={checkedItem.id}>
                  <ComponentForm item={checkedItem}/>
                </div> : null}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  onFormNameChanged(event) {
    this.props.dispatch({
      type: 'edit/setData',
      payload: {formName: event.target.value}
    })
  }

  onFormSubmit() {
    if (!this.props.formName.length) {
      return Message.error('请输入表单名')
    }
    if (!this.props.templates.length) {
      return Message.error('请先添加表单组件')
    }
    this.props.dispatch({
      type: 'edit/submit',
      id: this.id,
      formName: this.props.formName,
      templates: this.props.templates
    }).then(res => {
      Modal.success({
        title: this.id.length ? '已成功更新表单' : '已成功创建表单',
        centered: true,
        content: <a
          href={`/detail/${res.data}`}>{`${document.location.origin}/detail/${res.data}`}</a>,
        onOk: () => router.push('/')
      })
    })
  }

  handleCheckedComponent(item) {
    this.props.dispatch({type: 'edit/setData', payload: {checkedItem: item}})
  }

  onComponentClick(item) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    let data = JSON.parse(JSON.stringify(item.default))
    data.type = item.type
    data.id = uuid.generate()

    templates.push(data)
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }

  moveUp(index, event) {
    event.stopPropagation()
    if (index === 0) return 0
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    const newTemplates = utils.moveUp(templates, index)
    this.props.dispatch({type: 'edit/setTemplates', templates: newTemplates})
  }

  moveDown(index, event) {
    event.stopPropagation()
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    if (index === templates.length - 1) return
    const newTemplates = utils.moveDown(templates, index)
    this.props.dispatch({type: 'edit/setTemplates', templates: newTemplates})
  }

  deleteComponent(item, event) {
    event.stopPropagation()
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    const newTemplates = templates.filter(v => v.id !== item.id)
    this.props.dispatch({type: 'edit/setTemplates', templates: newTemplates})
    this.props.dispatch({type: 'edit/setData', payload: {checkedItem: null}})
  }
}

export default connect(({edit}) => ({...edit}))($Id$);
