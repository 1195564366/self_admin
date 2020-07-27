import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form, Input, message, Switch, InputNumber } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

function Project(props) {
  const formRef = React.createRef()
  // state
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [addShow, setAddShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // UI组件属性
  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort'
  }, {
    title: '显示/隐藏',
    dataIndex: 'isShow',
    key: 'isShow'
  }]


  useEffect(() => {
    getList()
  }, [pageNo])

  /**
  *** @title：请求列表数据
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-22 17:46:20
  **/
  const getList = async () => {
    setLoading(true)
    const res = await React.$fetchPost('/admin/project/list', {
      pageNo: pageNo,
      pageSize: 10
    })
    setLoading(false)
    if (res.code !== 200) {
      message.error(res.msg)
      return
    }
    setList(res.data.rows)
    setTotal(res.data.count)
  }

  const handleOk = () => {
    setAddShow(false)
  }
  const handleCancel = () => {
    setAddShow(false)
  }
  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setIsEdit(false)
            setAddShow(true)
          }}>
          新增项目
        </Button>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} rowKey="id" />

      {/* 新增编辑弹窗 */}
      <Modal
        title={isEdit ? '编辑用户' : '新增用户'}
        visible={addShow}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" ref={ formRef }>
          <Form.Item
            label="项目名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}>
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item
            label="排序"
            name="sort"
            rules={[
              {
                required: true,
                message: '请输入排序',
              },
            ]}>
            <InputNumber placeholder="请输入排序" />
          </Form.Item>
          <Form.Item
            label="显示/隐藏"
            name="status"
            rules={[
              {
                required: true,
                message: '请选择显示/隐藏',
              },
            ]}>
            <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
}

export default Project
