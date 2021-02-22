<template>
  <el-container class="lay-layout">
    <!-- <div v-if="device === 'mobile' ? false : themeSet.layout === 'sidemenu' ? true : false" class="lay-aside-replace" :class="asideRepClassName()" /> -->
    <lay-aside
      v-if="
        device === 'mobile'
          ? false
          : themeSet.layout === 'sidemenu'
            ? true
            : false
      "
    />
    <el-drawer
      v-if="device === 'mobile'"
      :visible.sync="sidebar.opened"
      direction="ltr"
      :before-close="handleClose"
      size="auto"
    >
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
    LayAside,
    LaySetting,
    LayHeader,
    LayTagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'themeSet', 'device'])
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
  mounted() { },
  methods: {
    handleClose(done) {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
<style lang="scss">
$darkBackColor: #001529;
$darkBack: #000c17;
$darkItemBackColor: #1890ff;
$darkTextColor: hsla(0, 0%, 100%, 0.65);
$darkActiveColor: #fff;
$darkHoverColor: #fff;

$lightBackColor: #fff;
$lightItemBackColor: #e6f7ff;
$lightTextColor: rgba(0, 0, 0, 0.85);
$lightActiveColor: #1890ff;
$lightHoverColor: #1890ff;
body {
  background-color: rgb(240, 242, 245);
}
.lay-layout {
  width: 100%;
  min-height: 100%;
  align-items: stretch !important;
}
.el-menu {
  &.el-menu--popup {
    .el-submenu {
      .el-submenu__title {
        line-height: 42px;
        height: 42px;
      }
    }
    &.el-menu--popup-right-start{
      margin-left: 0;
      margin-right: 0;
    }
  }
}
.lay-sider{
  .el-menu {
    font-feature-settings: "tnum","tnum";
    font-variant: tabular-nums;
    background-color: transparent;
    border-right: 0px;
    .el-menu-item, .el-submenu .el-submenu__title{
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      .lay-svg-icon{
        width: 1em;
        height: 1em;
        vertical-align: middle;
        margin-right:8px;
        transition: width .3s, height .3s;
      }
    }
  }
  .el-menu--collapse{
    >.el-menu-item .lay-svg-icon,
    >.el-submenu>.el-submenu__title .lay-svg-icon{
      width: 1.25em;
      height: 1.25em;
      margin-left: 6px;
      margin-right: 0px;
      transition: width .3s, height .3s;
    }
  }
}
.lay-header{
  .el-menu {
    .el-submenu {
      .el-submenu__title {
        height: 48px;
        line-height: 48px;
      }
      i {
        display: none;
      }
      &.is-active {
        .el-submenu__title {
          border-bottom: 2px solid transparent;
        }
      }
    }
    .el-menu-item {
      height: 48px;
      line-height: 48px;
      &.is-active {
        border-bottom-color: transparent;
      }
    }
  }
}

.lay-dark {
  .el-menu {
    &.el-menu--popup {
      background-color: $darkBackColor;
      .el-submenu {
        .el-submenu__title {
          background-color: transparent;
          color: $darkTextColor;
          &:hover {
            color: $darkHoverColor;
          }
        }
        &.is-active {
          .el-submenu__title {
            color: $darkActiveColor;
          }
        }
        &.is-opened {
          .el-submenu__title {
            color: $darkHoverColor;
          }
        }
      }
      .el-menu-item {
        background-color: transparent;
        color: $darkTextColor;
        line-height: 42px;
        height: 42px;
        &.is-active {
          background-color: $darkItemBackColor;
          color: $darkHoverColor;
        }
        &:hover {
          color: $darkHoverColor;
        }
      }

    }
  }
  .lay-sider{
    background-color: $darkBackColor;
    .el-scrollbar__view{
      >.el-menu {
        background-color: $darkBackColor;
        >.el-submenu {
          .el-submenu__title {
            color: $darkTextColor;
            &:hover{
              background-color: transparent;
              color: $darkHoverColor;
            }
          }
          &.is-active, &.is-opened{
            .el-submenu__title {
              color: $darkActiveColor;
            }
          }
          .el-menu.el-menu--inline{
            background-color: $darkBack;
            .el-submenu {
              .el-submenu__title {
                color: $darkTextColor;
                &:hover{
                  background-color: transparent;
                  color: $darkHoverColor;
                }
              }
              &.is-active, &.is-opened{
                .el-submenu__title {
                  color: $darkActiveColor;
                }
              }
            }
            .el-menu-item{
              background-color: transparent;
              color: $darkTextColor;
              &:hover{
                color: $darkHoverColor;
              }
              &.is-active{
                color: $darkActiveColor;
                background-color: $darkItemBackColor;
              }
            }
          }
        }
        >.el-menu-item{
          background-color: $darkBackColor;
          color: $darkTextColor;
          &:hover{
            color: $darkHoverColor;
          }
          &.is-active{
            color: $darkActiveColor;
            background-color: $darkItemBackColor;
          }
        }
      }
    }
    .lay-aside-children{
      background-color: #001529;
     }
     .lay-sider-logo{
       a{color: #fff;}
     }
     .lay-aside-link{
       border-color:rgba(0,0,0,.25);
       svg{fill: #fff;}
     }

  }
  .el-menu--horizontal {
    background-color: $darkBackColor;
    &.el-menu {
      > .el-submenu {
        .el-submenu__title {
          color: $darkTextColor;
          border-bottom: 2px solid transparent;
        }
        &.is-active,
        &.is-opened {
          .el-submenu__title {
            color: $darkActiveColor;
          }
        }
        &:hover {
          .el-submenu__title {
            background-color: transparent;
            color: $darkActiveColor;
          }
        }
      }
      > .el-menu-item {
        color: $darkTextColor;
        border-bottom: 2px solid transparent;
        &.is-active {
          color: $darkActiveColor;
        }
        &:hover {
          background-color: transparent;
          color: $darkActiveColor;
        }
      }
    }
  }
}
.lay-light {
  .el-menu {
    &.el-menu--popup {
      background-color: $lightBackColor;
      .el-submenu {
        .el-submenu__title {
          background-color: transparent;
          color: $lightTextColor;
          &:hover {
            color: $lightHoverColor;
          }
        }
        &.is-active {
          .el-submenu__title {
            color: $lightActiveColor;
          }
        }
        &.is-opened {
          .el-submenu__title {
            color: $lightHoverColor;
          }
        }
      }
      .el-menu-item {
        background-color: transparent;
        color: $lightTextColor;
        &.is-active {
          background-color: $lightItemBackColor;
          color: $lightHoverColor;
        }
        &:hover {
          color: $lightHoverColor;
        }
      }
    }
  }

  .el-menu--horizontal {
    &.el-menu {
      .el-submenu {
        .el-submenu__title {
          color: $lightTextColor;
          border-bottom: 2px solid transparent;
        }
        &.is-active,
        &.is-opened {
          .el-submenu__title {
            color: $lightActiveColor;
            border-bottom-color: $lightActiveColor;
          }
        }
        &:hover {
          .el-submenu__title {
            color: $lightActiveColor;
            border-bottom-color: $lightActiveColor;
          }
        }
      }
      .el-menu-item {
        color: $lightTextColor;
        border-bottom: 2px solid transparent;
        &.is-active {
          color: $lightActiveColor;
          border-bottom-color: $lightActiveColor;
        }
        &:hover {
          color: $lightActiveColor;
          border-bottom-color: $lightActiveColor;
        }
      }
    }
  }
}
</style>
