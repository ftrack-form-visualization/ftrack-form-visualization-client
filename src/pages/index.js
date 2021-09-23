/**
 * title: 首页
 */
import React from 'react'
import {Button, Popconfirm, Message, Table} from "antd";
import {Link} from 'umi'
import {connect} from 'dva'

import styles from './index.scss'

const Index = (props) => {
  const onDelete = (record) => {
    props.dispatch({'type': 'index/deleteForm', id: record.id}).then(() => {
      Message.success(`已成功删除 ${record.name}`)
    })
  }

  const columns = [
    {
      title: '表单名',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    }, {
      title: '表单链接',
      dataIndex: 'id',
      key: 'id',
      width: '60%',
      render: text => <a href={`/detail/${text}`} target='_blank'
                         rel="noopener noreferrer">{`${document.location.origin}/detail/${text}`}</a>
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type='primary' style={{marginRight: 8}}>
            <Link to={`/edit/${record.id}`}>编辑</Link>
          </Button>
          <Popconfirm title='确定要删除该表单吗？' onConfirm={() => onDelete(record)}>
            <Button type='danger'>删除</Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <div className={styles['content-wrapper']}>
      <div style={{marginBottom: 20}}>
        <Button type='primary'><Link to='/edit'>创建新表单</Link></Button>
      </div>
      <Table columns={columns} dataSource={props.forms}
             rowKey={d => d.id} loading={props.loading}/>
    </div>
  )
}

export default connect(({index, loading}) => ({
  ...index,
  loading: loading.effects['index/fetch']
}))(Index)
