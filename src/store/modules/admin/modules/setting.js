import api from '@/api/index'
import { Message, MessageBox } from 'element-ui';
import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    settingList: [],
    totalCount: 0
  },
  mutations: {
    setSettingList(state, data) {
      state.settingList = data;
    },
    setTotalCount(state, num) {
      state.totalCount = num;
    },
    updateSettingList(state, data) {
      state.setSettingList = state.setSettingList.map(i => i.id == data.id ? data : i);
    },
  },
  actions: {
    getSettingList({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.get(`/setting/getall${formatUrlParams(data)}`, null, res => {
          commit('setSettingList', res.data);
          commit('setTotalCount', res.totalCount);
          resolve();
        })
      })
    },
    insertSetting({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        var action = {
          url: '/setting',
          data: data,
          methods: 'post',
          success: function(res) {
            Message({ message: "设置添加成功", type: "success" });
          }
        };
        dispatch('fetchData', action);
        resolve();
      })
    },
    deleteSetting({ dispatch, commit }, settingid) {
      return new Promise((resolve, reject) => {
        MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          api.delete(
            `/setting?id=${settingid}`,
            null,
            res => {
              if (res.statusCode != 0) {
                Message({ message: res.result, type: 'error' });
              } else {
                Message({ message: "删除成功", type: "success" });
                resolve();
              }
            }
          )
        })
      })
    },
    updataSetting({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        var action = {
          url: "/setting",
          data: data,
          methods: 'patch',
          success: function(res) {
            Message({ message: "设置修改成功", type: "success" });
          }
        }
        dispatch('fetchData', action);
        resolve();
      })
    },
    fetchData({ commit }, { url, data, methods, success }) {
      if (!data) return;
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] != null && data[key].length > 0) {
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
            if (typeof success === 'function') success(res);
          }
        }
      )
    },
  }
}