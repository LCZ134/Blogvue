import api from '@/api/index';

import { Message, MessageBox } from 'element-ui';

import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    blogCommentList: [],
    totalCount: 0,
    blogCommentChild: []
  },
  mutations: {
    setblogComment(state, data) {
      state.blogCommentList = [];
      var newdata = data.map(s => {
        var result = {};
        Object.keys(s).forEach(i => {
          if (i == "isHidden") {
            result[i] = parseInt(s[i]) > 0 ? true : false;
          } else {
            result[i] = s[i];
          }
        })
        return result;
      })
      state.blogCommentList = newdata;
    },
    setTotalCount(state, count) {
      state.totalCount = count;
    },
    setBlogCommentChild(state, data) {
      state.blogCommentChild = [];
      state.blogCommentChild = data;
    },
    deleteBlogComment(state, blogCommentId) {
      state.blogCommentList = state.blogCommentList.filter(s => s.id != blogCommentId);
    },
    toggleBlogComment(state, data) {
      state.blogCommentList.forEach(s => s.isHidden = s.id == data.id ? data.isHidden : !data.isHidden);
    }
  },
  actions: {
    //获取所有评论
    getBlogCommentData({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get(`/Comment${formatUrlParams(data)}`, null, res => {
          commit('setblogComment', res.data);
          commit('setTotalCount', res.totalCount);
          resolve();
        })
      })
    },
    //获取子评论
    getBlogChildData({ commit }, parenId) {
      return new Promise((resolve, reject) => {
        api.get(`/Comment?ParentId=${parenId}`, null, res => {
          commit('setBlogCommentChild', res.data);
          resolve();
        })
      })
    },
    getBlogChild({ commit }, parenId) {
      api.get(`/Comment?ParentId=${parenId}`, null, res => {
        return res.data;
      })
    },
    //删除评论
    deleteBlogComment({ dispatch, commit }, blogData) {
      MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delete(
          `/Comment?blogCommentId=${blogData.blogCommentId}`,
          null,
          res => {
            if (res.statusCode != 0) {
              Message({ message: res.result, type: 'error' });
            } else {
              dispatch('getBlogCommentData', blogData.data);
              Message({ message: "删除成功", type: "success" });
            }
          }
        )
      })
    },
    updateBlogComment({ commit, state }, { id, isHidden }) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("isHidden", isHidden);
      api.patch(`/comment`, formData, res => {
        if (res.statusCode != 0) {
          Message({ message: res.result, type: 'error' });
        } else {
          Message({ message: "操作成功", type: "success" });
        }
      })

    }
  }
}