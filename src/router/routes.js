import Login from '@/views/system/Login'
import Index from '@/components/Index'

import BlogPost from './modules/blog'
import System from './modules/system'
import commont from './modules/comment'
import Home from './modules/home'

//侧边栏
const frameIn = [
  Home,
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