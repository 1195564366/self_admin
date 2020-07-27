import React, { useEffect } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './Login.scss'
import { Cache } from '@utils'
import { mainRouter } from '@/router'
import Config from '@/config'

function Login(props) {
  /**
  *** @title：判断是否是登录状态
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-26 10:11:02
  **/
  useEffect (() => {
    Cache.get(Config['userInfo']) && props.history.push(mainRouter[0].path)
  })
  /**
  *** @title：登录点击事件
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-26 10:10:37
  **/
  const onFinish = async (values) => {
    const result = await React.$fetchPost('/admin/login', {
      account: values.account,
      password: values.password
    })
    Cache.set(Config['userInfo'], result.data)
    
    message.success(`${result.data.name}，欢迎回来`)
    const routes = []
    mainRouter.forEach(route => {
      route.children ? route.children.forEach(r => routes.push(r)) : routes.push(route)
    })
    props.history.push(routes[0].path)
  }
  return (
    <div className="login-container">
      <div className="main-container">
        <div className="left-container">
        </div>
        <div className="right-container">
          <div className="title">攀大大聚合管理平台V1.0</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="account"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
