import api from '@/api/index'
import { formatUrlParams } from '@/utils'
import { Message, MessageBox } from 'element-ui';
import { Danmus } from '@/views/demo/Danmus/danmusList';


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
        api.get(`/Danmu${formatUrlParams(data)}`, null, res => {
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
      dispatch('fetchBlogPost', action);
    },
    deleteDanmu({ commit }, danmuId) {

      return new Promise((resolve, reject) => {
        MessageBox.confirm("此操作将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          api.delete(
            "/danmu/" + danmuId,
            null,
            res => {
              if (res.statusCode != 0) {
                Message({ message: res.result, type: 'error' });
              } else {
                resolve();
                Message({ message: "删除成功", type: "success" });
              }
            }
          )
        })
      })
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