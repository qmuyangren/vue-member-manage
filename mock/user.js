const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
module.exports = [
  // user login
  {
    url: '/cmsadmin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 602,
          data: token,
          message: 'Account and password are incorrect.',
          redirectUrl: '',
          requestUrl: '',
          timestamp: '',
          token: ''
        }
      }

      return {
        code: 200,
        data: token,
        message: '',
        redirectUrl: '',
        requestUrl: '',
        timestamp: '',
        token: ''
      }
    }
  },

  // get user info
  {
    url: '/cmsadmin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 508,
          data: '',
          message: 'Login failed, unable to get user details.',
          redirectUrl: '',
          requestUrl: '',
          timestamp: '',
          token: ''
        }
      }

      return {
        code: 200,
        data: info,
        message: '',
        redirectUrl: '',
        requestUrl: '',
        timestamp: '',
        token: ''
      }
    }
  },

  // user logout
  {
    url: '/cmsadmin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
        message: '',
        redirectUrl: '',
        requestUrl: '',
        timestamp: '',
        token: ''
      }
    }
  }
]
