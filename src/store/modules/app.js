import variables from '@/assets/theme/element-variables.scss'
import Cookies from 'js-cookie'

const app = {
  namespaced: true,
  state: {
    themeSet: { // 主题设置
      navTheme: 'dark', // 整体风格设置（导航背景）
      primaryColor: '#1890FF', // 主题颜色
      layout: 'sidemenu', // 导航模式sidemenu || topmenu
      contentWidth: 'Fluid', // 内容区域宽度 如果当前导航模式为sidemenu哪么只能是流式，如果是topmenu哪可以选择定宽或流式
      fixedHeader: true, // 固定头部
      autoHideHeader: false, // 下滑时隐藏顶部
      fixSiderbar: true, // 让sidemenu固定高度出现滚动条
      tagsView: true // 标签导航是否显示
    },
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop', // 是否移动端
    theme: variables.theme, // 得到elementui的版本号
    asideMinWidth: 72,
    asideMaxWidth: 208,
    headerHeight: 48,
    colorList: ['#1890FF', '#F5222D', '#FA541C', '#FAAD14', '#13C2C2', '#52C41A', '#2F54EB', '#722ED1'],
    themeStyle: [{ value: 'dark', label: '亮色菜单风格' }, { value: 'light', label: '亮色菜单风格' }],
    layoutList: [{ value: 'sidemenu', label: '侧边菜单布局' }, { value: 'topmenu', label: '顶部菜单布局' }],
    topList: [{ value: 'Fixed', label: '流式' }, { value: 'Fluid', label: '定宽' }],
    sideList: [{ value: 'Fixed', label: '流式' }],
    size: Cookies.get('size') || 'medium',
    // currentRoute: '', // 当前路由地址
    lang: 'cn', // 语言
    langs: [{ name: 'cn', label: '中文(简体)' }, { name: 'tw', label: '中文(繁体)' }, { name: 'en', label: 'English' }]
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    // 主题
    UPDATE_THEME(state, data) {
      document.body.className = data
      state.theme = data
      window.localStorage.setItem('theme', data)
    },
    UPDATE_THEMESET(state, data) {
      if (data[1]) {
        if (state.themeSet[data[0]]) {
          state.themeSet[data[0]] = data[1]
        }
      } else {
        // console.log(!!state.themeSet[data[0]])
        state.themeSet[data[0]] = !!state.themeSet[data[0]]
      }
      window.localStorage.setItem('themeSet', JSON.stringify(state.themeSet))
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    // 大小
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    // 语言
    UPDATE_LANG(state, data) {
      state.lang = data
      window.localStorage.setItem('lang', data)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ state, commit, rootState, dispatch }, size) {
      commit('SET_SIZE', size)
    },
    changeThemeSet({ state, commit, rootState, dispatch }, data) {
      commit('UPDATE_THEMESET', data)
    },
    changeTheme({ state, commit, rootState, dispatch }, data) {
      commit('UPDATE_THEME', data)
    },
    changeLang({ state, commit, rootState, dispatch }, data) {
      commit('UPDATE_LANG', data)
    }
  }
}

export default app
