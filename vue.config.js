// https://cli.vuejs.org/zh/config/
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const pageTitle = 'vue member' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  publicPath: '',
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    }
    config.resolve.alias['~'] = resolve('src/views')
  },
  chainWebpack(config) {
    config
      .plugin('html') // 修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
      .tap((args) => {
        args[0].title = pageTitle
        return args
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    port: port,
    // port: 8083,
    proxy: {
      [process.env.VUE_APP_API_PREFIX]: {
        target: `http://localhost:${port}/mock`,
        autoRewrite: true,
        cookieDomainRewrite: {
          '*': ''
        },
        pathRewrite: {
          ['^' + process.env.VUE_APP_API_PREFIX]: ''
        }
      }
    },
    before: require('./mock/mock-server.js')
  }
}
