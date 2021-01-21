import axios from '../axios'
import userUrls from '../urls/user'
import { desEncrypt } from '@/utils'

export default {
  // 登录
  fetchLogin(data) {
    data.password = desEncrypt(data.password)
    console.log(data)
    return axios.post(userUrls.login, data)
  },
  // 获取用户基本信息
  fetchUserInfo(data) {
    return axios.get(userUrls.info, data)
  },
  // 退出登录
  fetchLogout(data) {
    return axios.get(userUrls.logout, data)
  },
  // 找回密码
  forgetPass(data) {
    return axios.get(userUrls.logout, data)
  },
  // 验证码 是否使用前端验证码
  fetchCode(data) {
    return axios.get(userUrls.logout, data)
  },
  // 单点登录
  fetchSingleLogin(data) {
    return axios.get(userUrls.singleLogin, data)
  },
  // 单点登录登录信息
  fetchSingleInfo(data) {
    return axios.get(userUrls.singleInfo, data)
  },
  // 单点登录设置详情
  fetchSingleLoginDetail(data) {
    return axios.get(userUrls.singleLoginDetail, data)
  },
  // 单点登录设置修改
  fetchSingleLoginUpdate(data) {
    return axios.post(userUrls.singleLoginUpdate, data)
  }
}
