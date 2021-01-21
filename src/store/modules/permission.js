import { rootRoute, exceptionRoutes, filterAsyncRoutes } from '@/router'
import asyncRoutes from '@/router/asyncRoutes'

export default {
  namespaced: true,
  state: {
    routes: [],
    addRoutes: [],
    excludes: [],
    includes: [],
    openTarget: ['modelVipDetail//']
  },
  mutations: {
    SET_ROUTES: (state, data) => {
      const root = data.find(d => d.path === '/')
      state.routes = root ? root.children : []
    },
    SET_EXCLUDES: (state, data) => {
      state.excludes = data
    },
    SET_INCLUDES: (state, data) => {
      state.includes = data
    },
    CLEAR_ROUTES: (state) => {
      state.addRoutes = []
      state.routes = []
      state.excludes = []
      state.includes = []
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      // 开发时使用本地路由数据
      const openPermission = window.localStorage.getItem('openPermission')
      if (openPermission !== '1') {
        debugger
        return new Promise(resolve => {
          const accessedRoutes = filterAsyncRoutes(asyncRoutes.concat(exceptionRoutes))
          commit('SET_ROUTES', [{
            ...rootRoute,
            children: accessedRoutes
          }])
          resolve([{
            ...rootRoute,
            children: accessedRoutes
          }])
        })
      }
    }
  }
}
