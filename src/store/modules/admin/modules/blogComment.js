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
      state.blogCommentList = data;
    },
    setTotalCount(state, count) {
      state.totalCount = count;
    },
    setBlogCommentChild(state, data) {
      state.blogCommentChild = data;
    },
    deleteBlogComment(state, blogCommentId) {
      state.blogCommentList = state.blogCommentList.filter(s => s.id != blogCommentId);
    },
    toggleBlogComment(state, data) {
      state.blogCommentList.forEach(s => s.IsHidden = s.id == data.id ? data.IsHidden : !data.IsHidden);
    }
  },
  actions: {
    //获取所有评论
    getBlogCommentData({ commit }, data) {
      return new Promise((resolve, reject) => {
        var result = {};
        Object.keys(data).forEach(key => {
          result[key] = key != 'pageIndex' ? data[key] : data[key] - 1;
        });

        api.get(`/Comment/GetAll${formatUrlParams(result)}`, null, res => {
          commit('setblogComment', res.data);
          commit('setTotalCount', res.totalCount);
          resolve();
        })
      })
    },
    //获取子评论
    getBlogChildData({ commit }, parenId) {
      return new Promise((resolve, reject) => {
        api.get(`/Comment/GetAll?ParentId=${parenId}`, null, res => {
          commit('setBlogCommentChild', res.data);
          resolve();
        })
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
    //显示评论
    HideBlogComment({ commit, state }, blogCommentId) {

      if (state.blogCommentList.find(s => s.id == blogCommentId).isHidden != 0) {
        Message({ message: "已经为显示", type: 'error' });
        return false;
      }
      const formData = new FormData();
      formData.append("id", blogCommentId);

      MessageBox.confirm("此操作将显示评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: 'warning'
      }).then(() => {
        api.post("/Comment/ShowBlogComment", formData, res => {
          if (res.statusCode != 0) {
            Message({ message: res.result, type: 'error' });
          } else {
            commit('toggleBlogComment', { id: blogCommentId, IsHidden: true });
            Message({ message: "操作成功", type: "success" });
          }

        })
      })
    },
    //隐藏评论
    ShowBlogComment({ commit, state }, blogCommentId) {

      if (state.blogCommentList.find(s => s.id == blogCommentId).isHidden != 1) {
        Message({ message: "已经为隐藏", type: 'error' });
        return false;
      };

      const formData = new FormData();
      formData.append("id", blogCommentId);

      MessageBox.confirm("此操作将显示评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: 'warning'
      }).then(() => {
        api.post("/Comment/HideBlogComment", formData, res => {
          if (res.statusCode != 0) {
            Message({ message: res.result, type: 'error' });
          } else {
            commit('toggleBlogComment', { id: blogCommentId, IsHidden: false });
            Message({ message: "操作成功", type: "success" });
          }
        })
      })
    }
  }
}