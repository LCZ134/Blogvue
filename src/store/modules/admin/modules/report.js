import api from '@/api/index'
import { Message } from 'element-ui';

export default {
  namespaced: true,
  state: {
    reportToday: {}
  },
  mutations: {
    setreport(state, data) {
      state.reportToday = data;
    }
  },
  actions: {
    getReportToday({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        api.get("/Report", null, res => {
          commit("setreport", res);
        })
        resolve();
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
  }
}