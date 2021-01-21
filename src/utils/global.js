
import router from '@/router/index'
import rules from './rules'
import request from '@/api'
// import enums from './enums'
// import echarts from 'echarts'
// import { encodeUnicode, decodeUnicode, emojiString } from './emoji.js'

var moment = require('moment') // 日期处理类库
export default {
  install(Vue, options) {
    /** 路由跳转
     * @method $routerLink
     * @param {path：路径，type：类型(list：列表，edit:修改，save：新增)，queryParams：请求参数}
    */
    Vue.prototype.$routerLink = function(path, type, queryParams, moduleId = 0) {
      var params = {
        type: type
      }
      params = Object.assign(params, queryParams)
      // 路由
      router.push({ path: path, query: params })
    }
    Vue.prototype.$rules = rules
    /** 时间戳转换
     * @method $moment
     * @param {time：时间戳，format：转换格式}
    */
    Vue.prototype.$moment = function(str, type = 'YYYY-MM-DD HH:mm:ss', filter = false) {
      if (filter) {
        if (str) {
          return moment(parseInt(str)).format(type)
        } else {
          return '-'
        }
      } else {
        return str
      }
    }

    Vue.prototype.$request = request
    /** 当res.code === 200 时
     * @method $restBack
     * @param {res：回调参数，fn ： 成功后回调函数，message：成功提示，type：提示类型}
    */
    Vue.prototype.$restBack = function(res, fn = () => {}, message = '操作成功', type = 'success') {
      if (res.code === 200) {
        this.$message({
          message: message || res.message,
          type: type
        })
        fn()
      }
    }
  }
}
