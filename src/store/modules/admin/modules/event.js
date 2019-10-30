import api from '@/api/index'
import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    eventList: [],
  },
  mutations: {
    setEventList(state, data) {
      state.eventList = data;
    },
  },
  actions: {
    getEventList({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get(`/BrowsingHistory/GetEvent${formatUrlParams(data)}`, null, res => {
          commit('setEventList', res.data);
          resolve();
        })
      })
    }
  }
}