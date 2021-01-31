const getters = {
  user: state => state.user.user,
  routings: state => state.user.routings,
  setting: state => state.system.setting,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  themeSet: state => state.app.themeSet,
  addRoutes: state => state.permission.addRoutes,
  routes: state => state.permission.routes,
  visitedViews: state => state.permission.visitedViews,
  cachedViews: state => state.permission.cachedViews
}

export default getters
