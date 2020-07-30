import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Modal, Form, Input, InputNumber, message, Empty, Drawer, Dropdown, Menu } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import './VideoSourse.scss'

export default function VideoSourse() {
  const [courseForm] = Form.useForm()
  const [courseShow, setcourseShow] = useState(false)
  const [courseList, setCourseList] = useState([])
  const [courseLoading, setCourseLoading] = useState(false)

  const [chapterId, setChapterId] = useState(null)
  const [chapterList, setChapterList] = useState([])
  const [chapterForm] = Form.useForm()
  const [drawerShow, setDrawerShow] = useState(false)
  const [chapterShow, setChapterShow] = useState(false)
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
    setChapterId(record.id)
    const result = await React.$fetchGet('/admin/chapter/list', {
      cid: record.id
    })
    setChapterList(result.data)
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
  const chapterSubmit = async () => {
    try {
      const values = await chapterForm.validateFields();
      const result = await React.$fetchPost('/admin/chapter/add', { ...values, ...{ cid: chapterId } })
      if (result.code !== 200) return
      message.success('课程章节新增成功')
      chapterForm.resetFields()
      ViewClick({
        id: chapterId
      })
      setChapterShow(false)
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
        <Button type="primary" onClick={() => {
          ViewClick(record)
        }}>查看</Button>
        <Button type="ghost">编辑</Button>
        <Button type="danger">删除</Button>
      </Space>
    )
  }]
  return (
    <div className="video-sourse-wrapper">
      <div style={{ textAlign: 'right', marginRight: '30px', marginBottom: '30px' }}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setcourseShow(true)
          }}
        >添加课程</Button>
      </div>
      <Table
        pagination={false}
        loading={courseLoading}
        locale={{
          emptyText: () => {
            return (
              <Empty description="暂无课程" />
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
        <Form form={courseForm} layout="vertical">
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
        getContainer={false}
        width={500}
        visible={drawerShow}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" onClick={() => {
              setChapterShow(true)
            }}>
              新增章节
            </Button>
          </div>
        }
      >
        {chapterList.map((item, index) => {
          console.log(document.querySelector(`.chapter-item-${item.id}`))
          return <div key={item.id} className={'chapter-item ' + 'chapter-item-' + item.id}>
            <Dropdown 
              getPopupContainer={() => document.querySelector(`.chapter-item-${item.id}`)}
              placement="bottomLeft"
              overlay={
                <Menu>
                  <Menu.Item>
                    <Button type="link">
                      添加
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button type="link" style={{
                      color: '#575757'
                    }}>
                      编辑
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button type="link" style={{
                      color: '#FF4D4F'
                    }}>
                      删除
                    </Button>
                  </Menu.Item>
                </Menu>
              }>
              <h3>
                第{index + 1}章 {item.name}
              </h3>
            </Dropdown>
            
            <div className="desc">
              {item.intr}
            </div>
          </div>
        })}
      </Drawer>
      {/* 新增/编辑章节弹窗 */}
      <Modal
        title="添加章节"
        visible={chapterShow}
        onOk={() => {
          chapterSubmit()
        }}
        onCancel={() => {
          setChapterShow(false)
        }}
      >
        <Form form={chapterForm} layout="vertical">
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
