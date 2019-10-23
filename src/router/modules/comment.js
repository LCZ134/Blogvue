import Index from '@/components/Index'
import blogComment from '@/views/demo/blogComment/blogCommentList'
import leaveword from '@/views/demo/blogComment/leaveword'

export default {
  path: '/Comment',
  name: '评论管理',
  component: Index,
  meta: {
    title: '博客',
    showTab: false
  },
  IsHidden: true,
  children: [{
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
    {
      path: '/leaveword',
      name: '评论留言',
      component: leaveword,
      meta: {
        title: '评论留言',
        auth: true,
        showTab: true
      },
      IsHidden: true,
    },
  ]
}