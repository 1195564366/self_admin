import React from 'react'
import { Button, Table, Space } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
export default function VideoSourse() {

  const action = (type) => {
    if ([1, 2].includes(type)) {
      return (
        <>
          <Button type="ghost">编辑</Button>
          <Button type="danger">删除</Button>
        </>
      )
    } else {
      return (
        <>
          <Button type="primary">查看</Button>
          <Button type="danger">删除</Button>
        </>
      )
    }
  }

  const columns1 = [{
    title: '课程名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        {action(record.type)}
      </Space>
    )
  }]
  const data = [{
    key: '1',
    name: '测试课程',
    type: 1,
    children: [{
      name: '第一章',
      key: '1.1',
      type: 2
    }]
  }, {
    key: '2',
    name: '测试课程1',
    type: 1,
    children: [{
      name: '第一章',
      key: '2.1',
      type: 2,
      children: [{
        name: '第一节',
        key: '2.1.1',
        type: 3
      }]
    }]
  }]
  return (
    <div>
      <div style={{ textAlign: 'right', marginRight: '30px', marginBottom: '30px' }}>
        <Button 
          type="primary"
          icon={<PlusCircleOutlined />}
        >添加课程</Button>
      </div>
      <Table
        columns={columns1}
        dataSource={data}
      />
    </div>
  )
}
