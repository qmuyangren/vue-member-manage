<template>
  <el-menu
    :mode="modes"
    :default-active="activeMenu"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <menu-item :menu-data="dataTree" />
  </el-menu>
</template>
<script>
import MenuItem from './MenuItem'
import { mapGetters } from 'vuex'
export default {
  name: 'NavMenu',
  components: {
    MenuItem
  },
  props: {
    mode: {
      type: String,
      default: 'vertical' // horizontal(水平) / vertical（垂直）
    },
    menuData: {
      type: Array,
      default: () => {
        return []
      }
    },
    topMenuNum: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      dataTree: []
      // backColor: '',
      // textColor: '',
      // activeColor: ''
    }
  },
  computed: {
    ...mapGetters(['addRoutes', 'sidebar', 'themeSet', 'device']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route

      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      console.log('activeMenu', meta)
      // console.log('activeMenu', path)
      return path
    },
    isCollapse() {
      return this.themeSet.layout === 'topmenu' ? false : !!this.sidebar.opened
    },
    backColor() {
      return this.themeSet.navTheme === 'dark' ? '#001529' : '#FFFFFF'
    },
    modes() {
      return this.themeSet.layout === 'topmenu' ? 'horizontal' : 'vertical'
    }
  },
  watch: {
    topMenuNum() {
      if (this.mode === 'horizontal') {
        this.dataTree = this.getTopMenuItem(this.getSideMenuItem(this.getNavMenuItems(this.addRoutes[0].children)))
      }
    }
  },
  created() {
    // console.log(this.addRoutes)
    // 导航模式，是顶部显示，还是在侧边显示
    // 如果在顶部显示就必须有显示个数，如果多出来的，添加...的导航，将多于的导航放在这个下面
    if (this.mode === 'horizontal') {
      this.dataTree = this.getTopMenuItem(this.getSideMenuItem(this.getNavMenuItems(this.addRoutes[0].children)))
    } else {
      this.dataTree = this.getSideMenuItem(this.getNavMenuItems(this.addRoutes[0].children))
    }
  },
  methods: {
    getNavMenuItems: function(list) {
      var _this = this
      const accessedList = list.filter(item => {
        if (!item.hidden) {
          if (item.children && item.children.length) {
            item.children = _this.getNavMenuItems(item.children)
          }
          return true
        }
        return false
      })
      return accessedList
    },
    getSideMenuItem: function(list) {
      var _this = this
      const sideMenuList = list.filter(item => {
        if (!item.hidden) {
          if (item.children) {
            if (item.children.length === 0) { delete item.children } else {
              item.children = _this.getSideMenuItem(item.children)
            }
          }
          return true
        }
        return false
      })
      return sideMenuList
    },
    getTopMenuItem: function(list) {
      var newList = []
      var sum = this.topMenuNum
      list.forEach(function(item, index) {
        if (index < sum) {
          newList.push(item)
        } else {
          if (newList.length <= sum) {
            newList.push(
              { path: '···', name: '···', meta: { title: '···' }, children: [] })
          }
          newList[sum].children.push(item)
        }
      })
      return newList
    },
    handleSelect: function(key, index) {
      console.log(key, index)
      // var name = key
      // var id = this.$route.params.id
      // let path = ''
      // index.forEach((v, k) => {
      //   path += k !== 0 ? `/${v}` : v
      // })
      this.$router.push({
        path: key
      })
    }
  }
}
</script>
