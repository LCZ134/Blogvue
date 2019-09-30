import Index from '@/components/Index'

import blogpost from '@/views/demo/blogpost/blogPostList'
import blogposteditor from '@/views/demo/blogpost/blogposteditor'
import Taglist from '@/views/demo/taglist'
import blogComment from '@/views/demo/blogComment/blogCommentList'


export default {
  path: '/blogpost',
  name: '用户管理',
  component: Index,
  meta: {
    title: '博客',
    showTab: false
  },
  IsHidden: true,
  children: [{
    path: '/blogpostlist',
    name: '文章列表',
    component: blogpost,
    meta: {
      title: '文章列表',
      auth: true,
      showTab: true
    },
    IsHidden: true,
  }, {
    path: '/blogposteditor',
    name: '文章编辑',
    component: blogposteditor,
    meta: {
      title: '文章编辑',
      auth: true,
      showTab: true
    },
    IsHidden: true,
  }, {
    path: '/blogposteditor/:id',
    name: '文章编辑',
    component: blogposteditor,
    meta: {
      title: '文章编辑',
      auth: true,
      showTab: true
    },
    IsHidden: false,
  }]
}