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
      state.danmsList = data
    },
    setCount(state, data) {
      state.totalCount = data
    }
  },
  actions: {

    gitdanmlist({ commit }, data) {

      return new Promise((resolve, reject) => {
        var result = {};
        Object.keys(data).forEach(key => {
          result[key] = key != 'pageIndex' ? data[key] : data[key] - 1;
        });

        api.get(`/Danmu${formatUrlParams(result)}`, null, res => {
          commit('setdanms', res.data);
          commit('setCount', res.totalCount);
          resolve();
        })
      })
    },
    insertDanmu({ dispatch, commit }, data) {
      var action = {
        url: '/Danmu',
        data: data,
        methods: 'post',
        success: function(res) {
          Message({ message: "弹幕添加成功", type: "success" });
        }
      }

      console.log("添加数据", data);

      dispatch('fetchBlogPost', action);
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
            if (typeof success === 'function') success(res);
          }
        }
      )
    },
  }
}