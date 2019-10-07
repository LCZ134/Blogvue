import Login from '@/views/system/Login'
import Index from '@/components/Index'

import Home from '@/views/demo/Home'
import Userlist from '@/views/demo/User/userlist'
import UserAdd from '@/views/demo/User/useradd'

import BlogPost from './modules/blog'
import System from './modules/system'
import commont from './modules/comment'

const frameIn = [{
    path: '/',
    name: '主页',
    component: Index,
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
        path: '/useradd',
        name: '添加用户',
        component: UserAdd,
        meta: {
          title: '添加用户',
          auth: true,
          showTab: true
        },
        IsHidden: true,
      },
    ]
  },
  BlogPost,
  commont,
  System,

]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      showTab: false
    },
    IsHidden: false,
  }
]


/**
 * 错误页面
 */
// const errorPage = [{
//     path: '*',
//     name: '404',
//     component: Errors
// }]

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  // ...errorPage
]