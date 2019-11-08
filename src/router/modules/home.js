import Index from '@/components/Index'

import Home from '@/views/demo/Home'
import Userlist from '@/views/demo/User/userlist'
import UserAdd from '@/views/demo/User/useradd'

import Role from '@/views/demo/User/role'
import Personal from '@/views/demo/User/personal'
import EventList from '@/views/demo/User/event'



export default {
  path: '/',
  name: '主页',
  component: Index,
  icon: 'el-icon-house',
  meta: { requireAuth: true },
  IsHidden: true,
  children: [{
      path: '',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        auth: true,
        showTab: false
      },
      IsHidden: false,
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      meta: {
        title: '首页',
        auth: true,
        showTab: true
      },
      IsHidden: true,
    },
    {
      path: '/userlist',
      name: '用户管理',
      component: Userlist,
      meta: {
        title: '用户管理',
        auth: true,
        showTab: true
      },
      IsHidden: true,
    },
    {
      path: '/RoleList',
      name: '角色管理',
      component: Role,
      meta: {
        title: '角色管理',
        auth: true,
        showTab: true
      },
      IsHidden: true,
    },
    {
      path: '/editorUser',
      name: '信息编辑',
      component: Personal,
      meta: {
        title: '信息编辑',
        auth: true,
        showTab: true
      },
      IsHidden: false,
    },
    {
      path: '/EventList',
      name: '请求日志',
      component: EventList,
      meta: {
        title: '请求日志',
        auth: true,
        showTab: true
      },
      IsHidden: true,
    },
  ]
}