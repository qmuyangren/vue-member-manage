import router from '@/router'
import store from '@/store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { createRouter } from '.'

NProgress.configure({ showSpinner: false })

const getToken = function() {
  return localStorage.getItem('HDGSCMS-Auth-Token')
}
// const whiteList = ['/login', '/auth-redirect'] // 没有重定向白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     // determine whether the user has obtained his permission roles through getInfo
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     if (hasRoles) {
  //       next()
  //     } else {
  //       try {
  //         // get user info 获取用户信息
  //         // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
  //         // note: 注意:角色必须是一个对象数组!例如:['admin']或['developer'，'editor']
  //         const { roles } = await store.dispatch('user/getInfo')
  //         // 根据角色生成可访问路由图
  //         const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  //         // 动态添加可访问路由
  //         router.addRoutes(accessRoutes)
  //         // 攻击方法，以确保地址路由是完整的
  //         // 设置replace: true，这样导航就不会留下历史记录
  //         next({ ...to, replace: true })
  //       } catch (error) {
  //         // 删除令牌，并进入登录页面重新登录
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`)
  //   }
  //   NProgress.done()
  // }
  if (to.path === '/callback') {
    next()
    NProgress.done()
  } else if (getToken()) {
    // 登录后进入登录页
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      debugger
      // 当进入非登录页时，需要进行权限校验
      const addRoutes = store.getters.addRoutes
      if (addRoutes.length === 0) {
        store.dispatch('permission/GenerateRoutes').then((routes) => {
          if (routes instanceof Array && routes.length) {
            router.match = createRouter(router).match
            router.addRoutes(routes) // 动态添加可访问路由表
            next({ ...to }) //, replace: true
          } else {
            console.log('路由获取失败')
          }
        })
      }
    }
  } else {
    // console.log('已加载过动态路由')
    if (to.path === '/') {
      next({ path: '/workplace/index', replace: true })
    } else {
      if (store.state.permission.openTarget.includes(to.name) && from.name && from.name !== to.name) {
        window.open(`/#${to.fullPath}`)
      } else {
        next()
      }
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
