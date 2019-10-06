import Index from '@/components/Index'

import blogpost from '@/views/demo/blogpost/blogPostList'
import blogposteditor from '@/views/demo/blogpost/blogposteditor'
import Taglist from '@/views/demo/taglist'
import blogComment from '@/views/demo/blogComment/blogCommentList'


export default {
  path: '/blogpost',
  name: '文章管理',
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
      name: '添加文章',
      component: blogposteditor,
      meta: {
        title: '添加文章',
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
    },
    {
      path: '/taglist',
      name: '标签列表',
      component: Taglist,
      meta: {
        title: '标签列表',
        auth: true,
        showTab: true
      },
      IsHidden: true,
    }, {
      path: '/blogComment',
      name: '评论列表',
      component: blogComment,
      meta: {
        title: '评论列表',
        auth: true,
        showTab: true
      },
      IsHidden: true,
    },
    // {
    //   path: '/blogComment',
    //   name: '弹幕列表',
    //   component: blogComment,
    //   meta: {
    //     title: '弹幕列表',
    //     auth: true,
    //     showTab: true
    //   },
    //   IsHidden: true,
    // }
  ]
}