
// // 手机端宽度
// var w = document.body.clientWidth
// console.log(w)
// // 手机端高度
// var h = document.documentElement.clientHeight
// console.log(h)
// // 设备像素比
// this.pixel_ratio = window.devicePixelRatio
// // 客户端平台版本号
// var u = navigator.userAgent; var version = ''
// if (u.indexOf('Mac OS X') > -1) {
//   // ios
//   var regStr_saf = /OS [\d._]*/gi
//   var verinfo = u.match(regStr_saf)
//   version = (verinfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')
// } else if (u.indexOf('Android') > -1 ||
//     u.indexOf('Linux') > -1) {
//   // android
//   version = u.substr(u.indexOf('Android') + 8, u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8)
// } else if (u.indexOf('BB10') > -1) {
//   // 黑莓bb10系统
//   version = u.substr(u.indexOf('BB10') + 5, u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5)
// } else if (u.indexOf('IEMobile')) {
//   // windows phone
//   version = u.substr(u.indexOf('IEMobile') + 9, u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9)
// }
// this.os_version = version
// console.log(version)
// // 手机品牌
// // 引用mobile-detect文件
// var MobileDetect = require('mobile-detect')
// var md = new MobileDetect(navigator.userAgent)
// this.brand = md.mobile()
// // 操作系统
// this.os_type = md.os()
// // 手机型号
// var device_type = navigator.userAgent// 获取userAgent信息
// var os = md.os()// 获取系统
// var model = ''
// if (os == 'iOS') { // ios系统的处理
//   model = md.mobile()
// } else if (os == 'AndroidOS') { // Android系统的处理
//   var sss = device_type.split(';')
//   var i = sss.contains('Build/')
//   if (i > -1) {
//     model = sss[i].substring(0, sss[i].indexOf('Build/'))
//   }
// }
// this.model = model
// // 当前系统语言
// this.language = navigator.language
// // 网络类型
// var networkStr = device_type.match(/NetType\/\w+/) ? device_type.match(/NetType\/\w+/)[0] : 'NetType/other'
// networkStr = networkStr.toLowerCase().replace('nettype/', '')
// var networkType
// switch (networkStr) {
//   case 'wifi':
//     networkType = 'wifi'
//     break
//   case '4g':
//     networkType = '4g'
//     break
//   case '3g':
//     networkType = '3g'
//     break
//   case '3gnet':
//     networkType = '3g'
//     break
//   case '2g':
//     networkType = '2g'
//     break
//   default:
//     networkType = 'other'
// }
// this.device_network_type = networkType
// // 判断是不是手机
// if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
//   this.is_telephone = '是'
//   // console.log("是手机");
// } else {
//   this.is_telephone = '不是'
//   // console.log("不是手机");
// }
// // 判断是不是微信浏览器
// const ua = navigator.userAgent.toLowerCase()
// // 微信端
// if (String(ua.match(/MicroMessenger/i)) === 'micromessenger') {
//   this.isWechat = true
// } else {
//   this.isWechat = false
// }
