import api from '@/api/index'
import { formatUrlParams } from '@/utils'
import { Message, MessageBox } from 'element-ui';


export default {
  namespaced: true,
  state: {
    danmsList: [],
    totalCount: 0
  },
  mutations: {
    setdanms(state, data) {

    }
  },
  actions: {

    gitdanmlist({ commit }, data) {

      return new Promise((resolve, reject) => {

        var result = {};
        Object.keys(data).forEach(key => {
          result[key] = key != 'pageIndex' ? data[key] : data[key] - 1;
        });

        api.get(`/Danmu${result}`, null, res => {

          commit('setdanms', res.data);

          resolve();
        })
      })

    }
  }
}