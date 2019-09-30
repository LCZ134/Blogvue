import Index from '@/components/Index'

import Seting from '@/views/system/seting'
import blogposteditor from '@/views/demo/blogpost/blogposteditor'

export default {
  path: '/system',
  name: '系统设置',
  component: Index,
  meta: {
    title: '博客',
    showTab: false
  },
  IsHidden: true,
  children: [{
    path: '/blog',
    name: '设置',
    component: Seting,
    meta: {
      title: '设置',
      auth: true,
      showTab: true
    },
    IsHidden: true,
  }, {
    path: '/systemout',
    name: '退出',
    component: blogposteditor,
    meta: {
      title: '退出',
      auth: true,
      showTab: false
    },
    IsHidden: true,
  }]
}