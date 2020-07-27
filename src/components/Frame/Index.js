import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Modal, message } from 'antd';
import {
  createFromIconfontCN,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LoginOutlined,
  SoundOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import './Index.css'

import Logo from './logo.png'
import { mainRouter } from '../../router';
import { Cache } from '@utils'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1969462_dpd853zt7r6.js',
  ]
});

const routes = mainRouter.filter(item => !item.isHidden)
// console.log(mainRouter)
function Frame(props) {
  const [collapsed, setCollapsed] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    if (Cache.get('pddUserInfo')) {
      setUserInfo(Cache.get('pddUserInfo'))
    } else {
      props.history.push('/login')
    }
  }, [])

  /**
  *** @title：退出登录
  *** @param：
  *** @author：lupan
  *** @desc：
  *** @date：2020-05-22 20:04:15
  **/
  const logout = () => {
    Modal.confirm({
      title: '是否退出系统',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        Cache.clear()
        props.history.push('/login')
        message.success('退出成功')
      },
      onCancel() {},
    })
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {!collapsed && <img src={Logo} alt="" />}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.location.pathname]}
          defaultOpenKeys={
            props.location.pathname.split('/').length === 3
              ? [props.location.pathname]
              : [props.location.pathname.split('/').splice(0, 3).join('/')]
          }
        >
          {routes.map(route => {
            return (
              !route.children ?
                <Menu.Item
                  key={route.path}
                  icon={ route.iconCustomize ? <IconFont type= {route.icon} /> : <route.icon />}
                  onClick={p => {
                    if (p.key === props.location.pathname) return
                    props.history.push(p.key)
                  }}>
                  {route.title}
                </Menu.Item>
                :
                <SubMenu key={route.path} title={route.title} icon={route.iconCustomize ? <IconFont type= {route.icon} /> : <route.icon />}>
                  {
                    route.children.map(r => {
                      return <Menu.Item key={r.path}
                        onClick={p => {
                          if (p.key === props.location.pathname) return
                          props.history.push(p.key)
                        }}> {r.title} </Menu.Item>
                    })
                  }
                </SubMenu>
            )
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style: { padding: '0 24px' },
            onClick: () => {
              setCollapsed(!collapsed)
            },
          })}
          <Dropdown overlay={
            <Menu>
              <Menu.Item icon={<SoundOutlined />}>
                通知中心
              </Menu.Item>
              <Menu.Item icon={<LoginOutlined />} onClick={logout}>
                退出登录
              </Menu.Item>
            </Menu>
          }>
            <span className="user-info-container">
              <Avatar style={{ backgroundColor: '#87d068', marginRight: '5px' }} icon={<UserOutlined />} />
              {userInfo.name}
            </span>
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(Frame)
