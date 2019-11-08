import api from '@/api/index'
import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    eventList: [],
    totalCount: 0
  },
  mutations: {
    setEventList(state, data) {
      state.eventList = data;
    },
    setTotalCount(state, num) {
      state.totalCount = num;
    },
  },
  actions: {
    getEventList({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get(`/BrowsingHistory/GetEvent${formatUrlParams(data)}`, null, res => {
          commit('setEventList', res.data);
          commit('setTotalCount', res.totalCount);
          resolve();
        })
      })
    }
  }
}