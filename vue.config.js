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
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
  publicPath: '',
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    }
    config.resolve.alias['~'] = resolve('src/views')
  },
  // sass全局变量
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/theme/_variables.scss";`
      }
    }
  },
  chainWebpack(config) {
    config
      .plugin('html') // 修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
      .tap((args) => {
        args[0].title = pageTitle
        return args
      })
    // 可以提高第一屏的速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 当页面太多时，会导致太多无意义的请求
    config.plugins.delete('prefetch')
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
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    /*
    * 启用跨域服务
    */
    // proxy: {
    //   [process.env.VUE_APP_API_PREFIX]: {
    //     target: process.env.VUE_APP_API_HOST,
    //     autoRewrite: true,
    //     cookieDomainRewrite: {
    //       '*': ''
    //     },
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_API_PREFIX]: ''
    //     }
    //   }
    // },
    before: require('./mock/mock-server.js') // 启用mock服务
  }
}
