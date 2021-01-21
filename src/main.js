import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/sass/index.scss'
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/router/permission'
import globalUtil from './utils/global'
// import './assets/icon'
import 'babel-polyfill'
import '@/components/index'
import './assets/icon'
import '../mock'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(ElementUI)
Vue.use(globalUtil)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
