const modulesFiles = require.context('./apis', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  modules = Object.assign(modules, value.default)
  console.log('modules', modules)
  return modules
}, {})

export default modules
