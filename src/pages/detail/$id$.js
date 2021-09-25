/**
 * title: 表单
 */
import React, {Component} from 'react';
import {Form, Button} from 'antd'
import {connect} from 'dva'

import {Session, Event as FtrackEvent} from '@ftrack/api'
import ftrackWidget from 'ftrack-web-widget'

import utils from "@/utils/utils";
import styles from './styles.scss'

let session = null
const FormItem = Form.Item


function onWidgetLoad() {
  const credentials = ftrackWidget.getCredentials()
  session = new Session(credentials.serverUrl, credentials.apiUser, credentials.apiKey, {autoConnectEventHub: true})
}

function onDomContentLoaded() {
  ftrackWidget.initialize({
    onWidgetLoad
  })
}

class $Id$ extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
    this.params = this.getQueryVariable()
    this.identifier = this.params.identifier
    this.sel_id = this.params.sel_id

    delete this.params[this.identifier]
    delete this.params[this.sel_id]
  }

  componentDidMount() {
    onDomContentLoaded()
    this.props.dispatch({
      type: 'detail/initData',
      id: this.id,
      defaultData: this.params
    })
  }

  render() {
    const {templates} = this.props
    return (
      <div style={{
        display: 'flex',
        backgroundColor: '#282c34',
        overflowY: 'auto'
      }}>
        <Form className={styles.container} labelCol={{span: 4}}
              wrapperCol={{span: 20}}>
          {templates.map((item, index) => (
            <FormItem label={<p
              style={{
                paddingTop: 9,
                color: '#935ba2',
                fontWeight: 'bold'
              }}>{item.title}</p>} key={item.name}
                      style={{marginBottom: -1}}>
              {utils.makeComponent({
                ...item, callback: data => this.handleValueChanged(data)
              })}
            </FormItem>
          ))}
          <FormItem wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary"
                    style={{width: '100px', marginBottom: 22}}
                    size="large"
                    onClick={() => this.handleSubmit()}>提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  handleValueChanged(data) {
    let values = JSON.parse(JSON.stringify(this.props.values))
    values[data['name']] = data['value']
    this.props.dispatch({
      type: 'detail/setData',
      payload: {values}
    })
  }

  handleSubmit() {
    const event = new FtrackEvent('ftrack.action.launch', {
        actionIdentifier: this.params.identifier,
        values: {...this.props.values, selectionId: this.sel_id},
      }
    )
    session.eventHub.publish(event)
    ftrackWidget.closeWidget()
  }

  getQueryVariable() {
    // 获取传过来的变量值
    let href = window.location.href
    let query = href.substring(href.indexOf('?') + 1);
    let vars = query.split("&");
    let obj = {}
    if (vars[0] === href) return obj

    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[1].indexOf(',') !== -1) {
        obj[pair[0]] = pair[1].split(',')
      } else {
        obj[pair[0]] = pair[1]
      }
    }
    return obj;
  }
}

export default connect(({detail}) => ({...detail}))($Id$);
