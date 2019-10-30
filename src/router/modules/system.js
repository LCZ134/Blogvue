import Index from '@/components/Index'

import Setting from '@/views/system/seting'
import blogposteditor from '@/views/demo/blogpost/blogposteditor'

export default {
  path: '/system',
  name: '系统设置',
  component: Index,
  meta: {
    title: '博客',
    showTab: false
  },
  icon: 'el-icon-s-tools',
  IsHidden: true,
  children: [{
    path: '/setting',
    name: '设置',
    component: Setting,
    meta: {
      title: '设置',
      auth: true,
      showTab: true
    },
    IsHidden: true,
  }, {
    path: '/logout',
    name: '退出',
    meta: {
      title: '退出',
      auth: true,
      showTab: false
    },
    IsHidden: true,
  }]
}