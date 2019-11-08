import api from '@/api/index'
import { Message, MessageBox } from 'element-ui';
import { formatUrlParams } from '@/utils'

export default {
  namespaced: true,
  state: {
    noticeList: [],
    totalCount: 0
  },
  mutations: {
    setNoticeList(state, data) {
      state.noticeList = data;
    },
    setTotalCount(state, num) {
      state.totalCount = num;
    },
  },
  actions: {
    getNoticeList({ commit }, data) {
      return new Promise((resolve, reject) => {
        // api.get(`/BrowsingHistory/GetEvent${formatUrlParams(data)}`, null, res => {
        //   commit('setNoticeList', res.data);
        //   commit('setTotalCount', res.totalCount);
        //   resolve();
        // })
        resolve();
      })
    },
    insertNotice({ dispatch, commit }, data) {
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
    deleteNotice({ dispatch, commit }, noticeId) {
      return new Promise((resolve, reject) => {
        MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          api.delete(
            `/setting?id=${noticeId}`,
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
    updataNotice({ dispatch, commit }, data) {
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