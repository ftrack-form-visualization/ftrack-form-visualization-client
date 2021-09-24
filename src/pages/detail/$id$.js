import React, {Component} from 'react';
import {Form} from 'antd'
import {connect} from 'dva'


const FormItem = Form.Item

class $Id$ extends Component {
  constructor(props) {
    super(props)
    this.id = props.match.params.id
  }

  render() {
    const {templates} = this.props
    return (
      <Form>
        {templates.map((item, index) => (
          <FormItem>
            aaa
          </FormItem>
        ))}
      </Form>
    );
  }
}

export default connect(({detail}) => ({...detail}))($Id$);
