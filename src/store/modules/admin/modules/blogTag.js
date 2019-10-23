import api from '@/api/index'
import { formatUrlParams } from '@/utils'
import { Message, MessageBox } from 'element-ui';

export default {
  namespaced: true,
  state: {
    blogTagList: [],
    totalCount: 0,
  },
  mutations: {
    setBlogTags(state, data) {
      state.blogTagList = data;
    },
    setTotalCount(state, num) {
      state.totalCount = num;
    },
    setDelBlogTags(state, data) {
      state.blogTagList = state.blogTagList.filter(s => s != data.id);
    }
  },
  actions: {
    getBlogTagData({ commit }) {
      return new Promise((resolve, reject) => {
        api.get("/tag", null, res => {
          commit('setBlogTags', res);
          resolve();
        })
      })
    },
    getBlogTagwhereData({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get(`/tag/getALL${formatUrlParams(data)}`, null, res => {
          commit('setBlogTags', res.data);
          commit('setTotalCount', res.totalCount);
          resolve();
        })
      })
    },
    getBlogTag({ commit }, blogPostTagId) {
      api.get("/tag/blogPostTagId", null, res => {
        commit('setBlogTags', res);
      })
    },
    updateBlogTag({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        var action = {
          url: '/tag',
          data: data,
          methods: 'patch',
          success: function(res) {
            Message({ message: "标签编辑成功", type: "success" });
          }
        }
        dispatch('fetchBlogPost', action);
        resolve();
      })
    },
    insertBlogTag({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        var action = {
          url: '/tag',
          data: data,
          methods: 'post',
          success: function(res) {
            Message({ message: "标签添加成功", type: "success" });
          }
        }
        dispatch('fetchBlogPost', action);
        resolve();
      })
    },
    delteBlogTag({ dispatch, commit }, blogData) {
      MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delete(
          `/tag?blogTagId=${blogData.blogtagtId}`,
          null,
          res => {
            if (res.statusCode != 0) {
              Message({ message: res.result, type: 'error' });
            } else {
              dispatch('getBlogTagwhereData', blogData.data);
              Message({ message: "删除成功", type: "success" });
            }
          }
        )
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
            if (typeof success === 'function') {
              success(res);
            }
          }
        }
      )
    },

  }
}