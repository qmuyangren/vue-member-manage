const TokenKey = process.env.VUE_APP_TOKEN

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}

/**
 * 前端存储
 **/
// import Cookie from 'js-cookie'
// const TokenKey = 'HDGS'

// export function getToken() {
//   return Cookie.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookie.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookie.remove(TokenKey)
// }
