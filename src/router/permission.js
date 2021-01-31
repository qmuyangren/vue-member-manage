import router from '@/router'
import store from '@/store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { createRouter } from '.'

NProgress.configure({ showSpinner: false })

/**
 * 递归处理多余的 RouteView : <router-view>，
 * 让需要访问的组件保持在第一层 index : <router-view> 之下
 * @param to
 */
function handleKeepAlive(to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'RouteView') {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  }
}

const getToken = function() {
  return localStorage.getItem('CMS-Auth-Token')
}
const whiteList = ['/login', '/register'] // 没有重定向白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  handleKeepAlive(to)
  console.log(to, from)
  if (getToken()) { // 如果有token
    // 登录后进入登录页
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      // 当进入非登录页时，需要进行权限校验
      const addRoutes = store.getters.addRoutes
      // console.log(addRoutes.length, store.getters.routes)
      if (addRoutes.length === 0) {
        store.dispatch('permission/GenerateRoutes').then((routes) => {
          console.log('动态加载路由')
          // console.log(routes)
          if (routes instanceof Array && routes.length) {
            router.match = createRouter(routes).match
            router.addRoutes(routes) // 动态添加可访问路由表
            next({ ...to }) //, replace: true
          } else {
            console.log('路由获取失败')
          }
        })
      } else {
        // console.log('已加载过动态路由')
        if (to.path === '/') {
          next({ path: '/workplace', replace: true })
        } else {
          if (store.state.permission.openTarget.includes(to.name) && from.name && from.name !== to.name) {
            window.open(`/#${to.fullPath}`)
          } else {
            next()
          }
        }
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
