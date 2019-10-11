import api from '@/api/index'
import { formatUrlParams } from '@/utils'
import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    userinfo: JSON.parse(sessionStorage.getItem("user")),
    bloglist: [],
    blogUserList: [],
    totalCount: 0
  },
  mutations: {
    login(state, userinfo) {
      sessionStorage.setItem("user", JSON.stringify(userinfo));
      state.userinfo = userinfo;
    },
    loginout(state) {
      Cookies.remove('token');
      sessionStorage.removeItem("user");
    },
    setUserlist(state, data) {
      state.blogUserList = data;
    },
    setTotalCount(state, num) {
      state.totalCount = num;
    },
  },
  actions: {
    getBlogTagData({ commit }, data) {
      return new Promise((resolve, reject) => {

        var result = {};
        Object.keys(data).forEach(key => {
          result[key] = key != 'pageIndex' ? data[key] : data[key] - 1;
        });

        api.get(`/User/GetUserList${formatUrlParams(result)}`, null, res => {

          commit('setUserlist', res.data);
          commit('setTotalCount', res.totalCount);

          resolve();
        })
      })
    },
  }
}