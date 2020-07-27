import Login from '@pages/Login/Login'
import NoFond from '@pages/NoFond/NoFond'

// 页面
import Home from '@pages/main/Home/Home.js'
import CustomerList from '@pages/main/Customer/CustomerList'
import Account from '@pages/main/System/Account/Account'
import Project from '@pages/main/System/Project/Project'
import Dictionary from '@pages/main/System/Dictionary/Dictionary'

// 博客管理
import BlogList from '@pages/main/Blog/list'
import BlogClass from '@pages/main/Blog/class'

// 成长之路
import VideoSourse from '@pages/main/Study/VideoSourse'

// 图标模块
import {
  UserOutlined,
  SettingOutlined,
  HomeOutlined
} from '@ant-design/icons';

export const pageRouter = [{
  path: '/login',
  component: Login
}, {
  path: '/404',
  component: NoFond
}]

export const mainRouter = [{
  path: '/main/home',
  title: '首页',
  component: Home,
  icon: HomeOutlined
}, {
  path: '/main/blog',
  title: '博客管理',
  iconCustomize: true,
  icon: 'iconbokeyuan',
  redirect: '/main/blog/list',
  children: [{
    path: '/main/blog/class',
    title: '博客分类',
    component: BlogClass
  },{
    path: '/main/blog/list',
    title: '博客列表',
    component: BlogList
  }]
},
{
  path: '/main/study',
  title: '成长之路',
  iconCustomize: true,
  icon: 'iconchengchang',
  // redirect: '/main/study/video/course',
  children: [{
    path: '/main/study/video/course',
    title: '视频课程',
    component: VideoSourse
  }]
},
{
  path: '/main/customer',
  title: '客户管理',
  component: CustomerList,
  icon: UserOutlined
}, {
  path: '/main/system',
  title: '系统管理',
  icon: SettingOutlined,
  redirect: '/main/system/account',
  children: [{
    path: '/main/system/account',
    title: '账号管理',
    component: Account
  }, {
    path: '/main/system/project',
    title: '项目管理',
    component: Project
  }, {
    path: '/main/system/dictionary',
    title: '字典管理',
    component: Dictionary
  }]
}]