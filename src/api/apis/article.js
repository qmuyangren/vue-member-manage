import axios from '../axios'
import articleUrls from '../urls/article'

export default {
// 内容搜索列表
  fetchArticlePage(data) {
    return axios.post(articleUrls.articlePage, data)
  }
}
