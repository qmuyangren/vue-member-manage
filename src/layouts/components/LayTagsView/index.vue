<template>
  <div class="lay-tabs-container">
    <!-- tag操作菜单 -->
    <ContextMenu ref="contextMenu" :item-list="menuItemList" :visible.sync="menuVisible" @mouseleave="onMouseLeave" @select="onMenuSelect" />
    <!-- tab显示 -->
    <el-tabs
      v-model="activePage"
      type="card"
      closable
      @tab-click="changePage"
      @tab-remove="removeTab"
      @contextmenu.native="onContextMenu"
    >
      <el-tab-pane
        v-for="page in keepAliveList"
        :key="page.fullPath"
        :name="page.fullPath"
        :label="page.meta.title"
      />
    </el-tabs>
  </div>
</template>
<script>
import ContextMenu from './ContextMenu'
import { mapActions } from 'vuex'
export default {
  name: 'LayTagsView',
  components: { ContextMenu },
  data() {
    return {
      keepAliveList: [],
      linkList: [],
      activePage: '',
      menuVisible: false,
      menuItemList: [
        { key: '1', text: '刷新' },
        { key: '2', text: '关闭' },
        { key: '3', text: '关闭其他' },
        { key: '4', text: '关闭所有' }
      ]
    }
  },
  computed: {},
  watch: {
    '$route': function(newRoute, oldRoute) {
      console.log('新路由：', newRoute)
      if (newRoute.path !== '/') {
        this.activePage = newRoute.fullPath
        // 将fullPage转成path，如果存在表示重复，需要进行替换
        const linkList = this.linkList.map(p => p.split('?')[0])
        const index = linkList.indexOf(newRoute.path)
        if (index < 0) {
          this.linkList.push(newRoute.fullPath)
          this.keepAliveList.push(newRoute)
        } else {
          this.linkList.splice(index, 1, newRoute.fullPath)
          this.keepAliveList.splice(index, 1, newRoute)
        }
      }
    },
    'activePage': function(key) {
      if (key) this.$router.push(key)
    },
    keepAliveList(newData, oldData) {
      var pageList = []
      newData.forEach(d => {
        const { fullPath, name, meta, params, path, query } = d
        pageList.push({
          fullPath, name, meta, params, path, query
        })
      })
      window.localStorage.setItem('keepAliveList', JSON.stringify({ pageList }))
      this.AsyncIncludes(newData.map(d => d.name))
      console.log(this.$store.state.permission.includes)
    }
  },
  created() {
    const path = this.$route.fullPath
    if (path !== '/') {
      this.keepAliveList.push(this.$route)
      this.linkList.push(path)
      this.activePage = path
    }
  },
  mounted() {
    try {
      const pageListStr = window.localStorage.getItem('keepAliveList')
      const pageList = JSON.parse(pageListStr).pageList
      if (pageList instanceof Array && pageList.length) {
        this.keepAliveList = pageList
        this.linkList = pageList.map(d => d.fullPath)
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions('permission', ['AsyncIncludes', 'DelIncludes', 'AddIncludes']),
    changePage(tab) {
      this.activePage = tab.name
      // this.$router.push({ path: this.activePage })
    },
    removeTab(key) {
      if (key.startsWith('/workplace/dashboard')) {
        this.$message('工作台不能关闭')
        return
      }
      var index = this.linkList.indexOf(key)
      const removePage = this.linkList[index]
      this.linkList = this.linkList.filter(item => item !== key)
      this.keepAliveList = this.keepAliveList.filter(item => item.fullPath !== key)
      index = index >= this.linkList.length ? this.linkList.length - 1 : index
      if (index >= 0) {
        if (removePage === this.activePage) this.activePage = this.linkList[index]
      } else {
        this.activePage = ''
        this.$routerLink('/')
      }
    },
    onContextMenu(e) {
      e.preventDefault()
      const id = e.target.id
      if (id) {
        this.menuVisible = true
        this.$refs.contextMenu.setPosition(e)
      }
    },
    onMenuSelect(key, pageKey) {
      switch (key) {
        case '1': // 刷新
          this.reflushCurrentPage(pageKey)
          break
        case '2': // 关闭
          this.removeTab(pageKey)
          break
        case '3': // 关闭其他
          this.closeOthersPage(pageKey)
          break
        case '4': // 关闭所有
          this.closeAllPage(pageKey)
          break
        default:
          break
      }
    },
    // 刷新当前页
    reflushCurrentPage(pageKey) {
      const page = this.keepAliveList.find(p => p.fullPath === pageKey)
      if (page) {
        const that = this
        const pageName = page.name
        this.DelIncludes(pageName)
        console.log(this.activePage)
        this.$nextTick(() => {
          setTimeout(() => {
            that.$routerLink(page.fullPath)
            that.AddIncludes(pageName)
          }, 100)
        })
      }
    },
    // 关闭其他页
    closeOthersPage(pageKey) {
      const index = this.linkList.indexOf(pageKey)
      const workplaceIndex = this.keepAliveList.find(d => d.name === 'Dashboard')
      this.linkList = this.linkList.slice(index, index + 1)
      this.keepAliveList = this.keepAliveList.slice(index, index + 1)
      let idx = 0
      if (workplaceIndex && !this.keepAliveList.find(d => d.name === 'Dashboard')) {
        this.linkList.splice(0, 0, workplaceIndex.fullPath)
        this.keepAliveList.splice(0, 0, workplaceIndex)
        idx = 1
      }
      this.activePage = this.linkList[idx]
    },
    // 关闭所有页面
    closeAllPage(pageKey) {
      const workplaceIndex = this.keepAliveList.find(d => d.name === 'Dashboard')
      this.linkList = workplaceIndex ? [workplaceIndex.fullPath] : []
      this.keepAliveList = workplaceIndex ? [workplaceIndex] : []
      this.activePage = workplaceIndex ? workplaceIndex.fullPath : '/workplace/dashboard'
    },
    // 关闭左侧页
    closeLeft(pageKey) {
      const index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(index)
      this.keepAliveList = this.keepAliveList.slice(index)
      if (this.linkList.indexOf(this.activePage) < 0) {
        this.activePage = this.linkList[0]
      }
    },
    // 关闭右侧页
    closeRight(pageKey) {
      const index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(0, index + 1)
      this.keepAliveList = this.keepAliveList.slice(0, index + 1)
      if (this.linkList.indexOf(this.activePage < 0)) {
        this.activePage = this.linkList[this.linkList.length - 1]
      }
    },
    onMouseLeave() {
      console.log('999')
    }
    // 阻止切换
    // beforeLeave (activeName, oldActiveName) {
    //   return this.$route.path.split('?')[0] === activeName.split('?')[0]
    // }
  }
}
</script>
<style lang='scss' >
.lay-tabs-container{
  .el-tabs.el-tabs--card.el-tabs--top{
    // background-color: #f5f5f5;
    // padding-top: 8px;
    // padding-bottom: 1px;
    .el-tabs__header{
      // margin-bottom: 0;
      // border-bottom: 0;
      // .el-tabs__nav-wrap{
      //   .el-tabs__nav{
      //     border: 0;
      //     .el-tabs__item {
      //       background-color: #e6e6e6;
      //       border:1px solid rgba(225,225,225,1);
      //       border-bottom: 0;
      //       border-radius:4px 4px 0px 0px;
      //       margin-right: 4px;
      //       font-size: 14px;
      //       color: #666666;
      //       line-height: 34px;
      //       height: 34px;
      //       padding: 0 10px 0 26px;
      //       .el-icon-close{
      //         margin-left: 25px;
      //         width: 14px;
      //       }
      //       &.is-active,
      //       &:hover{
      //         background-color: #ffffff;
      //       }
      //     }
          [id^='tab-/workplace/dashboard'] {
            padding-right: 20px;
            .el-icon-close{
              display: none;
            }
            &:hover{
              padding-left: 20px;
            }
          }
      //   }
      //   .el-tabs__nav-prev,
      //   .el-tabs__nav-next{
      //     line-height: 34px;
      //   }
      // }
    }
    .el-tabs__content{
      height: 0px;
    }
  }
}
</style>
