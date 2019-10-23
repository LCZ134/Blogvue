import api from '@/api/index'
import { Message, MessageBox } from 'element-ui';
import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    roleList: [],
    totalCount: 0,
  },
  mutations: {
    setRoleList(state, data) {
      state.roleList = data;
    },
    setRoleCount(state, count) {
      state.totalCount = count;
    },
    insertRole(state, data) {
      state.roleList = [data, ...state.roleList];
    },
    updateRole(state, data) {
      state.roleList = state.roleList.map(i => i.id === data.id ? data : i);
    }
  },
  actions: {
    getBlogCommentData({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get(`/role${formatUrlParams(data)}`, null, res => {
          commit('setRoleList', res.data);
          commit('setRoleCount', res.totalCount);
          resolve();
        })
      })
    },
    insertRole({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        var action = {
          url: '/role',
          data: data,
          methods: 'post',
          success: function(res) {
            Message({ message: "角色添加成功", type: "success" });
          }
        };
        dispatch('fetchBlogPost', action);
        resolve();
      })
    },
    delectRole({ dispatch, commit }, roleid) {
      return new Promise((resolve, reject) => {
        MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          api.delete(
            `/role/${roleid}`,
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
    updataRole({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        var action = {
          url: "/role",
          data: data,
          methods: 'patch',
          success: function(res) {
            Message({ message: "修改文章成功", type: "success" });
            commit('updateRole', data);
          }
        }
        dispatch('fetchBlogPost', action);

        resolve();
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