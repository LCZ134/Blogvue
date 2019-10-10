import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

// 路由数据
import routes from './routes'

const router = new VueRouter({
  mode: 'history',
  routes
})

//将所有未登录会话重定向到 /login
router.beforeEach((to, from, next) => {

  if (to.path === '/login') {
    Cookies.remove('token');
    sessionStorage.removeItem('user');
  }

  var user = sessionStorage.getItem('user');

  if (!user && to.path !== '/login') {
    next({
      path: '/login'
    });
  } else {
    next();
  }
})

router.afterEach(to => {
  // 多页控制 打开新的页面
  store.dispatch('admin/page/open', to)
})


export default router;