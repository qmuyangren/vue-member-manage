import request from '@/api'
const system = {
  namespaced: true,
  state: {
    setting: {
      id: '',
      aduitMemberFlowId: '',
      dataBackupsMemory: {},
      attrs: {}
    }
  },
  mutations: {
    // 系统设置
    SET_SETTING(state, data) {
      state.setting = data
      // if (data.attrs && data.attrs.systemFlagResourceUrl) {
      //   const href = getImageUrl(data.attrs.systemFlagResourceUrl)
      //   var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
      //   link.type = 'image/x-icon'
      //   link.rel = 'shortcut icon'
      //   link.href = href
      //   document.getElementsByTagName('head')[0].appendChild(link)
      // }
    }
  },
  actions: {
    async fetchSetting({ commit }) {
      request.fetchSystemSettingDetail().then(res => {
        if (res.code === 200) {
          commit('SET_SETTING', res.data)
        }
      })
    }
  }
}

export default system
