const modulesFiles = require.context('./api', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  modules = Object.assign(modules, value.default)
  console.log('api', modules)
  return modules
}, {})

export default modules
