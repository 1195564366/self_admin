import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Modal, Form, Input, InputNumber, message, Empty, Drawer } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
export default function VideoSourse() {
  const [ courseForm ] = Form.useForm()
  const [ courseShow, setcourseShow ] = useState(false)
  const [ courseList, setCourseList ] = useState([])
  const [ courseLoading, setCourseLoading ] = useState(false)

  const [ catalogId, setCatalogId ] = useState(null)
  const [ catalogList, setCatalogList ] = useState([])
  const [ catalogForm ] = Form.useForm()
  const [ drawerShow, setDrawerShow] = useState(false)
  const [ catalogShow, setCatalogShow ] = useState(false)
  useEffect(() => {
    getCourseList()
  }, [])

  const getCourseList = async () => {
    setCourseLoading(true)
    const result = await React.$fetchGet('/admin/course/list')
    setCourseList(result.data.map(item => {
      item.key = item.id
      return item
    }))
    setCourseLoading(false)
    console.log(result)
  }

  // 查看课程目录
  const ViewClick = async record => {
    setCatalogId(record.id)
    const result = await React.$fetchGet('/admin/chapter/list', {
      cid: record.id
    })
    setCatalogList(result.data)
    setDrawerShow(true)
  }
  // 新增/编辑 确认
  const courseSubmit = async () => {
    try {
      const values = await courseForm.validateFields();
      const result = await React.$fetchPost('/admin/course/add', values)
      if (result.code !== 200) return
      message.success('课程新增成功')
      courseForm.resetFields()
      setcourseShow(false)
      getCourseList()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  // 章节 新增/编辑 确认
  const catalogSubmit = async () => {
    try {
      const values = await catalogForm.validateFields();
      const result = await React.$fetchPost('/admin/chapter/add', {...values, ...{cid: catalogId}})
      if (result.code !== 200) return
      message.success('课程章节新增成功')
      catalogForm.resetFields()
      ViewClick({
        id: catalogId
      })
      setCatalogShow(false)
      // getCourseList()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  // 课程表头配置
  const columns = [{
    title: '课程名称',
    dataIndex: 'name'
  }, {
    title: '课程介绍',
    dataIndex: 'intr'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" onClick={ () => {
          ViewClick(record)
        } }>查看</Button>
        <Button type="ghost">编辑</Button>
        <Button type="danger">删除</Button>
      </Space>
    )
  }]
  return (
    <div>
      <div style={{ textAlign: 'right', marginRight: '30px', marginBottom: '30px' }}>
        <Button 
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={ () => {
            setcourseShow(true)
          } }
        >添加课程</Button>
      </div>
      <Table
        pagination={false}
        loading={courseLoading}
        locale={{
          emptyText: () => {
            return (
              <Empty description="暂无课程"/>
            )
          }
        }}
        columns={columns}
        dataSource={courseList}
      />
      {/* 新增/编辑课程弹窗 */}
      <Modal
        title="添加课程"
        visible={courseShow}
        onOk={() => {
          courseSubmit()
        }}
        onCancel={() => {
          setcourseShow(false)
        }}
      >
        <Form form={ courseForm } layout="vertical">
          <Form.Item name="name" label="课程名称" rules={[{ required: true, message: '请输入课程名称' }]}>
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item name="intr" label="课程介绍" rules={[{ required: true, message: '请输入课程介绍' }]}>
            <Input.TextArea maxLength={255} />
          </Form.Item>
        </Form>
      </Modal>
      {/* 章节目录抽屉 */}
      <Drawer
        title="章节目录"
        onClose={() => {
          setDrawerShow(false)
        }}
        width={500}
        visible={drawerShow}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" onClick={() => {
              setCatalogShow(true)
            }}>
              新增章节
            </Button>
          </div>
        }
      >
        { catalogList.map(item => {
          return <div key={item.id}>{ item.name }</div>
        })}
      </Drawer>
      {/* 新增/编辑章节弹窗 */}
      <Modal
        title="添加章节"
        visible={catalogShow}
        onOk={() => {
          catalogSubmit()
        }}
        onCancel={() => {
          setCatalogShow(false)
        }}
      >
        <Form form={ catalogForm } layout="vertical">
          <Form.Item name="name" label="章节名称" rules={[{ required: true, message: '请输入章节名称' }]}>
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item name="intr" label="章节介绍" rules={[{ required: true, message: '请输入章节介绍' }]}>
            <Input.TextArea maxLength={255} />
          </Form.Item>
          <Form.Item name="sort" label="章节排序" rules={[{ required: true, message: '请输入章节排序' }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
