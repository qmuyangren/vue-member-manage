import request from '@/api'
import { desEncrypt } from '@/utils'
const tokenName = process.env.VUE_APP_TOKEN
const column = {
  namespaced: true,
  state: {
    user: {
      needChangePassword: false,
      nextNeedCaptcha: false,
      'CMS-Auth-Token': '',
      userName: '',
      userAvatar: '',
      lastLoginTime: '',
      lastLoginIP: ''
    },
    routings: [], // 权限标识
    menus: [], // 菜单
    notice: '',
    ssoAuthToken: ''
  },
  mutations: {
    // 用户和路由权限
    SET_USER(state, data) {
      const { auth, ...propData } = data
      const { menus, routings, ...user } = auth
      state.user = Object.assign({}, state.user, user, propData)
      state.menus = menus || []
      state.routings = routings || []
      if (localStorage.getItem('userName') && localStorage.getItem('userName') !== user.userName) {
        Object.keys(localStorage).forEach(item => item.indexOf('pageList') !== -1 ? localStorage.removeItem(item) : '')
        window.localStorage.setItem('userName', user.userName)
        window.localStorage.setItem('userAvatar', user.userAvatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')
      } else {
        window.localStorage.setItem('userName', user.userName || '')
        window.localStorage.setItem('userAvatar', user.userAvatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')
      }
      if (propData[tokenName]) window.localStorage.setItem(`${tokenName}`, propData[tokenName])
      if (propData['siteId']) window.localStorage.setItem('siteId', propData['siteId'])
      if (propData['siteName']) window.localStorage.setItem('siteName', propData['siteName'])
    },
    // 退出，清空数据
    SET_OUT(state) {
      window.localStorage.removeItem('CMS-Auth-Token')
      state.user = {
        needChangePassword: false,
        nextNeedCaptcha: false,
        'CMS-Auth-Token': '',
        userName: '',
        lastLoginTime: '',
        lastLoginIP: ''
      }
      state.menus = []
      state.routings = []
      state.ssoAuthToken = ''
    },
    SET_NCP(state, data) {
      state.user.needChangePassword = data
    },
    UPDATE_USER(state, data) {
      state.user = Object.assign({}, state.user, data)
    },
    UPDATE_ROUTINGS(state, data) {
      state.routings = data || []
    },
    // 通知
    SET_NOTICE(state, data) {
      state.notice = data > 99 ? '99+' : data
    },
    // 单点登录token
    SET_SSO(state, data) {
      state.ssoAuthToken = data.authToken
    }
  },
  actions: {
    // 普通登录
    fetchLogin({ state, commit, rootState, dispatch }, data) {
      data.password = desEncrypt(data.password)
      return request.fetchLogin(data).then(res => {
        if (res.code === 200 && !res.data.nextNeedCaptcha) {
          commit('SET_USER', res.data)
          dispatch('system/fetchSetting', {}, { root: true })
          // dispatch('config/FetchSitesOwnsite', true, { root: true })
        }
        return res
      })
    },
    // 单点登录后获取详情
    fetchSingleInfo({ state, commit, rootState, dispatch }, data) {
      commit('SET_SSO', data)
      return request.fetchSingleInfo(data).then(res => {
        if (res.code === 200) {
          if (res.data.userType === 1) {
            commit('SET_USER', res.data)
            dispatch('system/fetchSetting', {}, { root: true })
            // dispatch('config/FetchSitesOwnsite', true, { root: true })
          } else {
            if (res.data.url) window.location.href = res.data.url
          }
        }
        return res
      })
    },
    // 退出
    fetchLogout({ state, commit, dispatch }) {
      const token = window.localStorage.getItem('CMS-Auth-Token')
      const authToken = state.ssoAuthToken
      request.fetchLogout({ token, authToken })
      commit('SET_OUT')
      dispatch('permission/Clear', true, { root: true })
    },
    // 是否需要修改密码
    SetNeedChangePassword({ commit }) {
      commit('SET_NCP', false)
    },
    // 用户通知
    fetchNotice({ state, commit, rootState, dispatch }, data) {
      return request.fetchSystemmessageNumber().then(res => {
        if (res.code === 200) {
          commit('SET_NOTICE', res.data.unreadMessage)
        }
      })
    }
  }
}

export default column
