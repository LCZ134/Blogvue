// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index'
import store from './store/index.js'
import Cookies from 'js-cookie'

Vue.prototype.$cookie = Cookies

//引用mavonEditor文件编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

//引用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//解决elementui点击同一个路由，页面报错
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 将API方法绑定到全局
import Axios from 'axios'

Vue.prototype.$axios = Axios;

Vue.prototype.$api = api
Vue.config.productionTip = false

//Charts
import myCharts from '@/comm/myCharts'

Vue.use(myCharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})