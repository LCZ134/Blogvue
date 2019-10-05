import api from '@/api/index'
import { blogpost } from '@/views/demo/blogpost/blogPostList';
import { formatUrlParams } from '@/utils'

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
    setUpdateBlogTags(state, data) {

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
        var result = {};
        Object.keys(data).forEach(key => {
          result[key] = key != 'pageIndex' ? data[key] : data[key] - 1;
        });

        api.get(`/tag/${formatUrlParams(result)}`, null, res => {

          console.log("tag", res, result);

          commit('setBlogTags', res.data);
          commit('getTotalCount', res.totalCount);
          resolve();
        })

      })
    },

    getBlogTag({ commit }, blogPostTagId) {
      api.get("/tag/blogPostTagId", null, res => {
        commit('getBlogTags', res);
      })
    },

    updateBlogTag({ commit }, data) {


    },
    insertBlogTag({ dispatch, commit }, data) {
      var action = {
        data: data,
        methods: 'post',
        success: function(res) {
          Message({ message: "标签添加成功", type: "success" });
        }
      }
      dispatch('fetchBlogPost', action);
    },
    delteBlogTag({ dispatch, commit }, blogTagId) {
      var action = {
        data: data,
        methods: 'delete',
        success: function(res) {
          Message({ message: "标签删除成功", type: "success" });
        }
      }
      dispatch('fetchBlogPost', action);
    },
    fetchBlogPost({ commit }, { data, methods, success }) {
      if (!data) return;
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      api[methods](
        "/tag",
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