import React, { useState, useEffect, useCallback } from 'react'
import { Table, Modal, Button, Form, Input, message, Row, Col, Card, Switch, InputNumber, Popconfirm } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

function Dictionary(props) {
  // state
  const dicRef = React.createRef()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [addShow, setAddShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // Table组件属性
  const columns = [{
    title: '标识',
    dataIndex: 'enumType',
    key: 'enumType'
  }, {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  }, {
    title: '详细',
    key: 'data',
    render: (text, record) => {
      return <div>
        {record.data.map((item, index) => {
          return <p key={record.enumType + index}>{JSON.stringify(item)}</p>
        })}
      </div>
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return <div>
        <Button type="link" onClick={() => {
          editClick(record)
        }}>编辑</Button>
        <Popconfirm title="是否删除该字典" onConfirm={() => {
          delClick(record)
        }}>
          <Button type="link" danger>删除</Button>
        </Popconfirm>
      </div>
    }
  }]

  /**
  *** @title：请求列表
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-28 11:54:58
  **/
  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    console.log(1111, dicRef)
  }, [isEdit])

  /**
  *** @title：请求列表数据
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-22 17:46:20
  **/
  const getList = async () => {
    setLoading(true)
    const res = await React.$fetchPost('/admin/dictionary/list')
    const arr = []
    res.data.forEach(item => {
      const index = arr.findIndex(findItem => findItem.enumType === item.enumType)
      if (index === -1) {
        arr.push({
          enumType: item.enumType,
          description: item.description,
          data: [{
            label: item.label,
            itemValue: item.itemValue,
            sortNo: item.sortNo,
            status: item.status
          }]
        })
      } else {
        arr[index].data.push({
          label: item.label,
          itemValue: item.itemValue,
          sortNo: item.sortNo,
          status: item.status
        })
      }
    })
    setLoading(false)
    setList(arr)
  }

  /**
  *** @title：编辑字典
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-27 14:05:28
  **/
  const editClick = (data) => {
    setIsEdit(true)
    setAddShow(true)
    requestAnimationFrame(() => {
      console.log(dicRef, data)
    })
  }
  /**
  *** @title：删除字典
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-28 10:22:46
  **/
  const delClick = async (data) => {
    console.log(data)
    const res = await React.$fetchPost('/admin/dictionary/del', {
      enumType: data.enumType
    })
    if (res.code !== 200) {
      message.error(res.msg)
      return
    }
    message.success('删除成功')
    getList()
  }
  /**
  *** @title：添加字典
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-27 13:58:14
  **/
  const handleOk = () => {
    // setAddShow(false)
    console.log(dicRef)
    dicRef.current.validateFields().then(async values => {
      if (!values.data) {
        message.warning('至少添加一条字典')
        return
      }
      const result = await React.$fetchPost('/admin/dictionary/add', values)
      if (result.code !== 200) {
        message.error(result.msg)
        return
      }
      message.success('添加成功')
      setAddShow(false)
      getList()
    }).catch(err => {
      console.log(err)
    })
  }

  /**
  *** @title：添加弹窗取消
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-27 14:05:06
  **/
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
            console.log(dicRef)
          }}>
          新增字典
        </Button>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} rowKey="enumType" pagination={{
        pageSize: 9999999,
        hideOnSinglePage: true
      }} />

      {/* 新增编辑弹窗 */}
      <Modal
        title={isEdit ? '编辑字典' : '新增字典'}
        visible={addShow}
        onOk={handleOk}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        onCancel={handleCancel}
      >
        <Form layout="vertical" name="dicForm" ref={dicRef}>
          <Form.Item
            label="字典标识"
            name="enumType"
            rules={[{ required: true, message: '请输入字典标识!' }]}>
            <Input placeholder="请输入字典标识" />
          </Form.Item>
          <Form.Item
            label="字典描述"
            name="description"
            rules={[{ required: true, message: '请输入字典描述!' }]}>
            <Input placeholder="请输入字典描述" />
          </Form.Item>
          <Form.List name="data">
            {(fields, { add, remove }) => {
              /**
               * `fields` internal fill with `name`, `key`, `fieldKey` props.
               * You can extends this into sub field to support multiple dynamic fields.
               */
              return (
                <div>

                  {fields.map((field, index) => (
                    <Card
                      title={`字典${index + 1}`}
                      key={index + 1}
                      extra={
                        fields.length > 1 &&
                        <Popconfirm placement="top" title="是否删除该字典？" okText="Yes" cancelText="No" onConfirm={() => {
                          remove(field.name)
                        }}>
                          <Button size="small" type="primary" danger shape="circle" icon={<MinusCircleOutlined />} />
                        </Popconfirm>
                      }>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="字典名称" name={[field.name, "label"]} rules={[{ required: true, message: '请输入字典名称!' }]}>
                            <Input placeholder="请输入字典名称" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="字典值" name={[field.name, "itemValue"]} rules={[{ required: true, message: '请输入字典值!' }]}>
                            <Input placeholder="请输入字典值" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="字典排序" name={[field.name, "sortNo"]} rules={[{ required: true, message: '请输入字典排序!' }]}>
                            <InputNumber placeholder="请输入字典排序" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="字典状态" valuePropName="status" name={[field.name, "status"]} rules={[{ required: true, message: '请选择字典状态!' }]}>
                            <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked></Switch>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                  <Form.Item>
                    <Popconfirm placement="top" title="是否添加字典？" okText="Yes" cancelText="No" onConfirm={() => {
                      add();
                    }}>
                      <Button
                        type="dashed"
                        style={{ width: "100%" }}
                      >
                        <PlusCircleOutlined /> 添加字典
                      </Button>
                    </Popconfirm>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </div>
  )
}

export default Dictionary
