import api from '@/api/index';
import { Message, MessageBox } from 'element-ui';
import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    bloglist: [],
    totalCount: 0,
    blogPost: [],
    selectComment: {
      status: false,
      blogContent: "",
      id: ""
    }
  },
  mutations: {
    getBlogPosts(state, data) {
      state.bloglist = data.map(s => {
        var result = {};
        Object.keys(s).forEach(i => {
          if (i == "isHidden" || i == "isTop") {
            result[i] = parseInt(s[i]) > 0 ? true : false;
          } else {
            result[i] = s[i];
          }
        })
        return result;
      })
    },
    getTotalCount(state, Count) {
      state.totalCount = Count;
    },
    getBlogPost(state, data) {
      state.blogPost[data.id] = data;
    },
    updateBlogPosts(state, data) {
      state.bloglist = state.blogpost.map(i => i.id === data.id ? data : i);
    },
    insertBlogPosts(state, data) {
      state.bloglist = [data, ...state.blogpost];
    },
    deleteBlogPost(state, blogPostId) {
      state.bloglist = state.bloglist.filter(s => s.id != blogPostId);
    },
    updataCulars(state, data) {
      state.selectComment.id = data.id;
      state.selectComment.status = data.status;
      state.selectComment.blogContent = state.bloglist.find(s => s.id == data.id).mdContent;
    },
    deleteCulars(state) {
      state.selectComment.status = false;
      state.selectComment.blogContent = "";
    }
  },
  actions: {
    getBlogData({ commit }) {
      return new Promise((resolve, reject) => {
        api.get("/blog", null, res => {
          commit('getBlogPosts', res.data);
          resolve();
        })
      })
    },
    getBlogwhereData({ commit }, data) {
      return new Promise((resolve, reject) => {

        console.log("数据", data);

        api.get(`/blog${formatUrlParams(data)}`, null, res => {
          commit('getBlogPosts', res.data);
          commit('getTotalCount', res.totalCount);
          resolve();
        })
      })
    },
    getBlogPost({ commit }, blogPostid) {
      return new Promise((resolve, reject) => {
        api.get("/blog/" + blogPostid, null, res => {
          commit('getBlogPost', res);
          resolve();
        })
      })
    },
    deleteBlogPost({ commit }, blogPostId) {
      MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delete(
          "/blog/" + blogPostId,
          null,
          res => {
            if (res.statusCode != 0) {
              Message({ message: res.result, type: 'error' });
            } else {
              commit('deleteBlogPost', blogPostId);
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
        if (typeof data[key] === "boolean") {
          formData.append(key, data[key] ? "1" : "0");
        } else {
          formData.append(key, data[key]);
        }
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
    insertBlogPost({ dispatch, commit }, data) {
      var action = {
        url: "/blog",
        data: data,
        methods: 'post',
        success: function(res) {
          Message({ message: "添加文章成功", type: "success" });
          commit('insertBlogPosts', res.extends);
        }
      }
      dispatch('fetchBlogPost', action);
    },
    updateBlogPost({ dispatch, commit }, data) {
      var action = {
        url: "/blog",
        data: data,
        methods: 'patch',
        success: function(res) {
          Message({ message: "修改文章成功", type: "success" });
          commit('updateBlogPosts', res.extends);
        }
      }
      dispatch('fetchBlogPost', action);
    },

    updatePostHidden({ dispatch, commit }, data) {
      var action = {
        url: "/blog/TriggerHidden",
        data: data,
        methods: 'patch',
        success: function(res) {
          Message({ message: "操作成功", type: "success" });
        }
      }
      dispatch('fetchBlogPost', action);
    },

    updatePostShow({ dispatch, commit }, data) {
      var action = {
        url: "/blog/TriggerTop",
        data: data,
        methods: 'patch',
        success: function(res) {
          Message({ message: "操作成功", type: "success" });
        }
      }
      dispatch('fetchBlogPost', action);
    },

    OpenCular({ commit }, data) {
      commit('updataCulars', data);
    },
    closeCular({ commit }) {
      commit('deleteCulars');
    }
  }
}