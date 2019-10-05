import settings from "@/settings";
import { Promise } from "q";
import router from '@/router'

export default {
  namespaced: true,
  state: {
    opened: settings.page.opened,
    current: '',
    pool: []

  },
  actions: {
    /**
     * @class opened
     * @description 更新页面列表上的某一项
     * @param {Object} context
     * @param {Object} payload { index, params, query, fullPath } 路由信息
     */
    openedUpdate({ state, commit, dispatch }, { index, params, query, fullPath }) {
      return new Promise(async resolve => {
        // 更新页面列表某一项
        let page = state.opened[index]
        page.params = params || page.params
        page.query = query || page.query
        page.fullPath = fullPath || page.fullPath
        state.opened.splice(index, 1, page)
          // end
        resolve()
      })
    },
    open({ commit, state, dispatch }, { name, params, query, fullPath }) {
      return new Promise((resolve, reject) => {
        try {
          // 已经打开的页面
          let opened = state.opened
            // 判断此页面是否已经打开 并且记录位置
          let pageOpendIndex = 0
          const pageOpend = opened.find((page, index) => {
            const same = page.fullPath === fullPath
            pageOpendIndex = same ? index : pageOpendIndex
            return same
          })

          console.log(fullPath, pageOpend);

          if (pageOpend) {
            // 页面以前打开过
            dispatch('openedUpdate', {
              index: pageOpendIndex,
              params,
              query,
              fullPath
            })
          } else {
            let page = state.pool.find(t => t.name === name)
            if (page == null || page.meta.showTab == false)
              return;
            dispatch('add', {
              tag: Object.assign({}, page),
              params,
              query,
              fullPath
            })
          }
          commit('currentSet', fullPath)
            // end
          resolve()
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    },
    add({ state }, { tag, params, query, fullPath }) {
      return new Promise(async resolve => {
        // 设置新的 tag 在新打开一个以前没打开过的页面时使用
        let newTag = tag
        newTag.params = params || newTag.params
        newTag.query = query || newTag.query
        newTag.fullPath = fullPath || newTag.fullPath
          // 添加进当前显示的页面数组
        state.opened.push(newTag)
          // end
        resolve()
      })
    },
    close({ state }, { tagName }) {
      return new Promise((resolve, reject) => {

        if (tagName != "/home") {
          state.opened = state.opened.filter(i => i.fullPath !== tagName)
        }

        if (state.current === tagName) {

          const { name = '', fullPath, params = {}, query = {} } = state.opened[state.opened.length - 1]

          state.current = fullPath
          let routerObj = {
            name,
            params,
            query
          }

          router.push(routerObj)
        }
        resolve()
      })
    },
    closeAll({ state }) {
      return new Promise((resolve, reject) => {
        state.opened = state.opened.filter(i => i.name == 'home')
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @class current
     * @description 设置当前激活的页面 fullPath
     * @param {Object} state state
     * @param {String} fullPath new fullPath
     */
    currentSet(state, fullPath) {
      state.current = fullPath
    },
    /**
     * @class pool
     * @description 保存 pool (候选池)
     * @param {Object} state state
     * @param {Array} routes routes
     */
    init(state, routes) {
      const pool = []
      const push = function(routes) {
        routes.forEach(route => {
          if (route.children && route.children.length > 0) {
            push(route.children)
          } else {
            if (!route.hidden) {
              const { meta, name, path } = route
              pool.push({ meta, name, path })
            }
          }
        })
      }
      push(routes)
      state.pool = pool
    }
  }
}