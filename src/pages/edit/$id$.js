import React, {Component} from 'react';
import {Row, Col, Card, Icon, Input, Button, Form} from "antd";
import {connect} from 'dva'

import utils from "@/utils/utils";
import styles from './index.scss'
import ComponentForm from "./components/ComponentForm";
import TextInput from "./components/TextInput";
import Switch from './components/Switch'

class $Id$ extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
  }

  makeComponent(data) {
    if (data.type === 'TextInput') {
      return <TextInput {...data}/>
    } else if (data.type === 'Switch') {
      return <Switch {...data}/>
    }
  }


  render() {
    const {components, templates} = this.props
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
                     style={{width: 260, marginRight: 10}}/>
              <Button type='primary' style={{marginRight: 20}}>保存表单</Button>
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
                    <Col span={12} key={item.title}>
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
                       ${item.checked ? styles['checked-box-active'] : ''}`}
                           onClick={() => this.handleCheckedComponent(item)}>
                        {item.checked ? <ToolBox/> : null}
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
              <ComponentForm/>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  handleCheckedComponent(item) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    templates.map(v => {
      if (v.id === item.id) {
        v.checked = true
      } else {
        v.checked = false
      }
      return v
    })
    this.props.dispatch({type: 'edit/setTemplates', templates})
  }

  onComponentClick(item) {
    const templates = JSON.parse(JSON.stringify(this.props.templates))
    let data = JSON.parse(JSON.stringify(item.default))
    data.checked = false
    data.type = item.type
    data.id = this.uuid()

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
  }

  uuid() {
    let temp_url = URL.createObjectURL(new Blob());
    let uuid = temp_url.toString()
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf('/') + 1);
  }
}

export default connect(({edit}) => ({...edit}))($Id$);
