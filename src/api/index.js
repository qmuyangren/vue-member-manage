const modulesFiles = require.context('./apis', true, /\.js$/)
// console.log('modulesFiles', modulesFiles)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  modules = Object.assign(modules, value.default)
  return modules
}, {})

export default modules
