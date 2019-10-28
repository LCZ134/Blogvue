import api from '@/api/index'
import { formatUrlParams } from '@/utils'
import Cookies from 'js-cookie'
import { Message, MessageBox } from 'element-ui';

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
    updateRole(state, data) {
      state.blogUserList = state.blogUserList.map(i => i.id === data.id ? data : i);
    }
  },
  actions: {
    getBlogTagData({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get(`/User/GetUserList${formatUrlParams(data)}`, null, res => {
          commit('setUserlist', res.data);
          commit('setTotalCount', res.totalCount);
          resolve();
        })
      })
    },
    updataUser({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {

        var result = {};
        Object.keys(data).forEach(i => {
          if (i === "roleName") {
            result["roleId"] = data[i];
          } else {
            result[i] = data[i];
          }
        })
        var action = {
          url: "/User",
          data: result,
          methods: 'patch',
          success: function(res) {
            Message({ message: "修改用户成功", type: "success" });
          }
        };
        dispatch('fetchBlogPost', action);
        resolve();
      })
    },
    deleteUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          api.delete(
            `/user/${userId}`,
            null,
            res => {
              if (res.statusCode != 0) {
                Message({ message: res.result, type: 'error' });
              } else {
                Message({ message: "删除成功", type: "success" });
                resolve();
              }
            }
          )
        })
      })
    },
    fetchBlogPost({ commit }, { url, data, methods, success }) {
      if (!data) return;
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      api[methods](
        url,
        formData,
        res => {
          if (res.statusCode != 0) {
            Message({ message: res.result, type: 'error' });
          } else {
            if (typeof success === 'function') success(res);
          }
        }
      )
    },
  }
}