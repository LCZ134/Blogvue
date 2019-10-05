import api from '@/api/index'

export default {
  namespaced: true,
  state: {
    userinfo: JSON.parse(sessionStorage.getItem("user")),
    bloglist: [],
    blogTagList: [],
  },
  mutations: {
    login(state, userinfo) {
      sessionStorage.setItem("user", JSON.stringify(userinfo));
      state.userinfo = userinfo;
    },
    loginout(state) {
      // Cookies.set('user', null, {
      //   expire: -1
      // });
      sessionStorage.removeItem("user");
    },
    getBlogTag(state, data) {
      state.blogTagList = data;
    },
  },
  actions: {
    getBlogTagData({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get("", null, res => {

        })
      })
    },



  }
}