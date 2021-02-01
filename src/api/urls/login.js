const prefix = '/cmsadmin'

export default {
  singleLogin: `${prefix}/sso/status`, // 单点登录
  singleInfo: `${prefix}/sso/getInfo`, // 单点登录登录信息
  singleLoginDetail: `${prefix}/sso`, // 单点登录设置详情
  singleLoginUpdate: `${prefix}/sso`, // 单点登录设置修改
  code: '/common/kaptcha', // 验证码
  login: `${prefix}/user/login`, // 登陆
  logout: `${prefix}/user/logout`, // 退出
  upload: `${prefix}/user/upload/o_upload`, // 上传
  pinyin: '/language/pinyin', // 返回中文首字母
  summary: '/language/summary', // 自动摘要
  adminpsw: `${prefix}/users/adminpsw`, // 修改密码
  docImport: `${prefix}/contentext/docImport`, // 导入word
  registerImg: '/register/getImage', // 登录封面图片

  forget: `${prefix}/user/forget`, // 找回密码
  register: `${prefix}/user/register`, // 用户注册
  usernameVal: `${prefix}/user/register`, // 验证用户名
  sendEmailCode: `${prefix}/user/emailCode`, // 发送邮箱验证码
  emailCode: `${prefix}/user/emailCode`, // 用户邮箱验证码
  sendPhoneCode: `${prefix}/user/phoneCode`, // 发送手机验证码
  phoneCode: `${prefix}/user/phoneCode` // 用户手机验证码
}
