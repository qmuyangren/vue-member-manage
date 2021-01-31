export default {
  // 登录
  login: 'views/User/Login',
  index: 'layouts/index',
  // 用户注册，找回密码
  register: 'views/User/Register/index', // 用户注册
  forget: 'views/User/Forget/index', // 找回密码
  forgetSteps: 'views/User/Forget/ForgetSteps', // 找回步骤
  // 异常
  Callback: 'views/Exception/Callback', // 返回首页
  Error: 'views/Exception/Error', // 全局错误页 500
  NotFound: 'views/Exception/NotFound', // 全局 400
  Redirect: 'views/User/Redirect', // 全局 400
  // 工作台
  Analysis: 'views/Workplace/Analysis', // 分析页
  Dashboard: 'views/Workplace/Dashboard', // 工作台
  Monitor: 'views/Workplace/Monitor', // 监控页

  '403': 'views/Exception/403', // 403
  '404': 'views/Exception/404', // 404
  '500': 'views/Exception/500' // 500
}
