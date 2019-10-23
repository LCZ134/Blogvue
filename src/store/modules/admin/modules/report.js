import api from '@/api/index'
import { Message } from 'element-ui';
import { promised } from 'q';

export default {
  namespaced: true,
  state: {
    reportToday: {},
    reportMouth: []
  },
  mutations: {
    setreport(state, data) {
      state.reportToday = data;
    },
    setReportMouth(state, data) {
      state.reportMouth = data;
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
    getReportMouth({ commit }) {
      return new Promise((resolve, reject) => {
        api.get("/Report/getmonth", null, res => {
          commit("setReportMouth", res);
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