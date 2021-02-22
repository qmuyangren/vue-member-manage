import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routeMap from '@/router/routeMap'
import RouteView from '@/layouts/components/RouteView'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

// 保持树形导航，但必须保证每一个上级要有一个1<router-view />
export function filterAsyncRoute(routes) {
  const res = []
  const loop = (routes, parentPath = '/') => {
    if (routes instanceof Array && routes.length) {
      routes.forEach(route => {
        const tmp = { ...route }
        if (routeMap[tmp.name]) {
          tmp.component = (resolve) => require([`@/${routeMap[tmp.name]}`], resolve)
          // tmp.component = () => import(`@/${routeMap[tmp.name]}`)
          // tmp.component = () => import('@/views/Workplace/Monitor')
        } else if (tmp.children instanceof Array && tmp.children.length) {
          tmp.component = RouteView
        }
        if (tmp.children instanceof Array && tmp.children.length) {
          tmp.children = filterAsyncRoute(tmp.children)
        }
        res.push(tmp)
      })
    }
  }
  loop(routes)
  return res
}
// 将树形导航转换成平行导航，为了保证原有的树形面包屑path 必须要有层级
// 补全面包屑path
export function repairRoutesPath(routes, parentPath) {
  const routeList = []
  parentPath = parentPath || '/'
  const loop = (routes) => {
    if (routes instanceof Array && routes.length) {
      routes.forEach(route => {
        const rt = { ...route }
        if (rt.path.indexOf('/') < 0) {
          rt.path = parentPath + '/' + rt.path
        }
        if (rt.children instanceof Array && rt.children.length) {
          rt.children = repairRoutesPath(rt.children, rt.hidden ? parentPath : rt.path)
        }
        routeList.push(rt)
      })
    }
  }
  loop(routes)
  return routeList
}
export function filterAsyncRoutes(routes) {
  const routeList = []
  const loop = (routes, parentPath = '/') => {
    if (routes instanceof Array && routes.length) {
      routes.forEach(route => {
        const { children, /* component, redirect,*/ ...rt } = route
        if (rt.path.indexOf('/') < 0) {
          rt.path = parentPath + '/' + rt.path
        }
        if (rt.hidden) {
          rt.meta = {
            ...(rt.meta || {}),
            activeMenu: parentPath
          }
        }
        if (routeMap[rt.name]) {
          rt.component = (resolve) => require([`@/${routeMap[rt.name]}`], resolve)
          // rt.component = () => import(`@/${routeMap[rt.name]}`)
        }
        if (children instanceof Array && children.length) {
          const subMenus = children.filter(c => c.menuType !== 2)
          if (subMenus.length) rt.redirect = subMenus[0].path
        }
        routeList.push(rt)
        if (children) {
          loop(children, rt.hidden ? parentPath : rt.path)
        }
      })
    }
  }
  loop(routes)
  return routeList
}
// 根路由
export const rootRoute = {
  path: '/',
  // name: 'index',
  component: (resolve) => require([`@/${routeMap.index}`], resolve)
  // component: () => import(`@/${routeMap.index}`)
}
// 公共路由
export const constantRoutes = [
  { path: '/login', name: 'login', hidden: true },
  { path: '/register', name: 'Register', hidden: true }, // 注册
  { path: '/agreement', name: 'Agreement', hidden: true }, // 用户协议
  { path: '/forget', name: 'Forget', hidden: true }, // 找回密码，先验证帐号
  { path: '/forgetSteps', name: 'ForgetSteps', hidden: true }, // 找回密码步骤
  { path: '/callback', name: 'callback', hidden: true },
  { path: '/redirect/:path(.*)', name: 'Redirect', hidden: true }, // 重定向
  { path: '/layout', name: 'layout', hidden: true }
]

export const exceptionRoutes = [
  { path: '/error', name: 'error', hidden: true },
  { path: '*', name: 'notFound', hidden: true }
]

// 路由实例化
export const createRouter = routes =>
  new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL, // process.env.BASE_URL,
    routes,
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) {
        return {
          selector: to.hash
        }
      } else if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

const routes = store.getters.routes.length ? store.getters.routes : constantRoutes
const router = createRouter(filterAsyncRoute(routes))
export default router

/*
// 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true // (默认 false)

//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

  // 当路由设置了该属性，则会高亮相对应的侧边栏。
  // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  activeMenu: '/article/list'
}
*/
