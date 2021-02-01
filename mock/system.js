const systemSet = {
  attrs: {
    productName: '内容网站群管理系统'
  },
  id: 1
}
module.exports = [
  // user logout
  {
    url: '/cmsadmin/config/global',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: systemSet,
        message: '',
        redirectUrl: '',
        requestUrl: '',
        timestamp: '',
        token: ''
      }
    }
  }
]
