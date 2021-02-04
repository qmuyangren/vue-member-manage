<template>
  <el-container class="lay-layout">
    <!-- <div v-if="device === 'mobile' ? false : themeSet.layout === 'sidemenu' ? true : false" class="lay-aside-replace" :class="asideRepClassName()" /> -->
    <lay-aside v-if="device === 'mobile' ? false : themeSet.layout === 'sidemenu' ? true : false" />
    <el-drawer v-if="device === 'mobile'" :visible.sync="sidebar.opened" direction="ltr" :before-close="handleClose" size="auto">
      <lay-aside />
    </el-drawer>
    <el-container>
      <lay-header />
      <el-main>
        <lay-tags-view />
        <el-container>
          <slot />
        </el-container>
      </el-main>
      <el-footer>Footer</el-footer>
      <lay-setting />
    </el-container>
  </el-container>
</template>
<script>
import LayAside from './module/LayAside'
import LaySetting from './components/LaySetting/index'
import LayHeader from './module/LayHeader'
// import TagsView from './components/TagsView/index'
import LayTagsView from './components/LayTagsView/index'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'
export default {
  name: 'BasicLayout',
  components: {
    LayAside, LaySetting, LayHeader, LayTagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar', 'themeSet', 'device'
    ])
  },
  watch: {
    themeSet: {
      handler(newName) {
        var bodyEle = document.getElementsByTagName('body')[0]
        bodyEle.setAttribute('class', 'lay-' + newName.navTheme)
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    handleClose(done) {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
<style lang="scss">
$darkBackColor: #001529;
$darkItemBackColor: #1890ff;
$darkTextColor: hsla(0,0%,100%,.65);
$darkHoverColor: #fff;
body{
background-color: rgb(240, 242, 245);
}
.lay-layout{
  width: 100%;
  min-height: 100%;
  align-items: stretch!important;
}
.lay-dark{
  .el-menu--popup{
    background-color: $darkBackColor;
    .el-submenu{
      .el-submenu__title{
        color: $darkTextColor;
        line-height: 42px;
        height: 42px;
        &:hover{
          background-color: transparent;
          color: $darkHoverColor;
        }
      }
      &.is-active{
        .el-submenu__title{
          color: $darkTextColor;
        }
      }
      &.is-opened{
        .el-submenu__title{
          color: $darkHoverColor;
        }
      }
    }
    .el-menu-item{
      color: $darkTextColor;
      line-height: 42px;
      height: 42px;
      &.is-active{
        background-color: $darkItemBackColor;
        color: $darkHoverColor;
      }
      &:hover{
        background-color: transparent;
        color: $darkHoverColor;
      }
    }
  }

  .el-menu{
    &.el-menu--horizontal{
      background-color: $darkBackColor;
      .el-submenu{
        .el-submenu__title{
          height: 48px;
          line-height: 48px;
        }
        &.is-active{
          .el-submenu__title{
            border-bottom: 0;
          }
        }
      }
      .el-menu-item{
        height: 48px;
        line-height: 48px;
        &.is-active{
          border-bottom: 0;
        }
      }
    }
  }

}
</style>
