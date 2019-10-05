import api from '@/api/index';

import { Message, MessageBox } from 'element-ui';

import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    blogCommentList: [],
    totalCount: 0,
  },
  mutations: {
    getblogComment(state, data) {
      state.blogCommentList = data;
    },
    getTotalCount(state, count) {
      state.totalCount = count;
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

        api.get(`/Comment${formatUrlParams(result)}`, null, res => {
          commit('getblogComment', res.data);
          commit('getTotalCount', res.totalCount);
          resolve();
        })
      })
    },

    //删除评论
    deleteBlogComment({ commit }, blogCommentId) {
      MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delete(
          "/comment/" + blogCommentId,
          null,
          res => {
            if (res.statusCode != 0) {
              Message({ message: res.result, type: 'error' });
            } else {
              commit('deleteBlogComment', blogCommentId);
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

      MessageBox.confirm("此操作将显示评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: 'warning'
      }).then(() => {
        api.post("/Comment/HideBlogComment", { id: blogCommentId }, res => {
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

      MessageBox.confirm("此操作将显示评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: 'warning'
      }).then(() => {
        api.post("/Comment/HideBlogComment", { id: blogCommentId }, res => {
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