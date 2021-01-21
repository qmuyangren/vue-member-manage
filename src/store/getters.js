const getters = {
  user: state => state.user.user,
  addRoutes: state => state.permission.addRoutes,
  routes: state => state.permission.routes
}

export default getters
