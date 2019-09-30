import api from '@/api/index'
import { blogpost } from '@/views/demo/blogpost/blogPostList';

export default {
  namespaced: true,
  state: {
    blogTagList: [],
    blogTagName: []
  },
  mutations: {
    getBlogTagDatas(state, data) {
      state.blogTagList = data;
    },
    getBlogTags(state, data) {

    }
  },
  actions: {
    getBlogTagData({ commit }) {
      return new Promise((resolve, reject) => {
        api.get("/tag", null, res => {
          commit('getBlogTagDatas', res);
          resolve();
        })
      })
    },
    getBlogTagwhereData({ commit }, data) {
      return new Promise((resolve, reject) => {
        data.pageIndex -= 1;
        api.get(`/blog${formatUrlParams(data)}`, null, res => {
          commit('getBlogTagDatas', res);
          resolve();
        })
      })
    },
    getBlogTag({ commit }, blogPostTagId) {
      api.get("/tag/blogPostTagId", null, res => {
        commit('getBlogTags', res);
      })
    }
  }
}