// 系统设置
import axios from '../axios'
import systemUrls from '../urls/system'
export default {
  fetchSystemSettingDetail() {
    return axios.get(systemUrls.systemSetting)
  }
}
