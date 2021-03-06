import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import './assets/theme/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依
// import './assets/sass/index.scss'
import './assets/theme/index.scss' // global css
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/router/permission'
import globalUtil from './utils/global'
import 'babel-polyfill'
import '@/components/index'
import './assets/icon'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

Vue.use(globalUtil)
Vue.config.productionTip = false

/**
*如果您不想使用模拟服务器
*你想使用MockJs来模拟api
*你可以执行:mockXHR()
*
*目前MockJs将在生产环境中使用，
*请在上网前删除它!!!
 */
// 通过环境变量来判断是否需要加载启用
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
