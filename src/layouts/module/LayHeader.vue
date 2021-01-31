<template>
  <el-header class="lay-header" :height="height">
    <div class="lay-header-main" :class="setHeaerClass()">
      <div v-if="themeSet.layout === 'topmenu'" class="lay-header-logo d-flex">
        <router-link to="/"><img src="../../assets/logo.svg"> <h1>{{ title }}</h1></router-link>
      </div>
      <div v-if="themeSet.layout !== 'topmenu'" class="lay-header-brand d-flex">
        <lay-aside-link :is-active="sidebar.opened" class="lay-header-aside" @toggleClick="toggleSideBar" />
        <LayBreadcrumb />
      </div>
      <div ref="lay-header-nav" class="lay-header-nav mr-auto">
        <LayMenu v-if="themeSet.layout === 'topmenu'" mode="horizontal" :top-menu-num="topMenuNum" />
      </div>
      <div class="lay-header-global">
        <LaySearch />
        <LayNotice />
        <LaySelectLang />
        <LaySelectSize />
        <LayUser />
      </div>
    </div>
  </el-header>
</template>
<script>
import LayBreadcrumb from '../components/LayBreadcrumb/index'
import LayAsideLink from '../components/LayAsideLink/index'
import LayNotice from '../components/LayNotice/index'
import LaySearch from '../components/LaySearch/index'
import LaySelectLang from '../components/LaySelectLang/index'
import LayUser from '../components/LayUser/index'
import LaySelectSize from '../components/LaySelectSize/index'
import LayMenu from '../components/LayMenu/index'
import { mapGetters } from 'vuex'
export default {
  name: 'LayHeader',
  components: {
    LayBreadcrumb, LayAsideLink, LayNotice, LaySearch, LaySelectLang, LayUser, LaySelectSize, LayMenu
  },
  data() {
    return {
      height: '48px',
      title: 'Ant Design Pro',
      topMenuNum: 6
    }
  },
  computed: {
    ...mapGetters([
      'sidebar', 'themeSet'
    ])
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        // that.fullWidth = window.fullWidth
        // console.log(this.$refs['lay-header-nav'].offsetWidth)
        // console.log(this.$refs['lay-header-nav'].firstElementChild.childNodes)
        if (window.fullWidth >= 768) {
          const nodes = this.$refs['lay-header-nav'].firstElementChild.childNodes
          const nodesW = []
          const domWidth = this.$refs['lay-header-nav'].offsetWidth
          var sun = 0
          that.topMenuNum = 12
          nodes.forEach(element => {
            sun += element.offsetWidth
            nodesW.push(sun)
          })
          nodesW.some(function(v, i) {
            console.log(v, i, domWidth)
            v = v + 80
            if (v >= domWidth) {
              that.topMenuNum = i
              return true
            }
          })
        }
        // console.log(that.topMenuNum)
        // topMenuNum
      })()
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    setHeaerClass() {
      const className = []
      if (this.themeSet.layout === 'topmenu') { className.push('lay-header-dark') }
      if (this.themeSet.fixedHeader === true) { className.push('lay-header-fixed') }
      return className
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
$drawer: 'lay-header';
.#{$drawer}{
  padding:0;
  .#{$drawer}-main{
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
  .#{$drawer}-logo{
    min-width: 192px;
    a{
      display: flex;
      align-items: center;
      text-decoration: none;
      img{
        display: inline-block;
        height: 32px;
        vertical-align: middle;
      }
      h1 {
        display: inline-block;
        margin: 0 0 0 12px;
        color: #fff;
        font-weight: 400;
        font-size: 16px;
        vertical-align: top;
      }
    }
  }
  .#{$drawer}-nav{
    flex: 1 1 0%;
    .el-menu--horizontal{
      border-bottom: 0px;
      >.el-submenu, >.el-menu-item{
        height: 48px;
        line-height: 48px;
        .el-submenu__title{
          height: 48px;
        line-height: 48px;
        }
        &.is-active{
          border-bottom: 0;
          .el-submenu__title{
            border-bottom: 0;
          }
        }
      }
    }
  }
  .#{$drawer}-global{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .#{$drawer}-aside, .#{$drawer}-search, .#{$drawer}-notice,.#{$drawer}-lang,.#{$drawer}-user,.#{$drawer}-size{
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 48px;
    &:hover{
      background-color: rgba(0,0,0,.025);
    }
  }

  .#{$drawer}-lang{
    .el-dropdown-link{
      line-height: 24px;
      display: block;
    }
  }
}
.#{$drawer}-main{
  &.#{$drawer}-dark{
    background-color: #001529;
    color: rgba(0,0,0,.85);
    .#{$drawer}-global{
      .lay-svg-icon{
        color: #fff;
        fill: #fff;
      }
    }
    .#{$drawer}-aside, .#{$drawer}-search, .#{$drawer}-notice,.#{$drawer}-lang,.#{$drawer}-user,.#{$drawer}-size{
      &:hover{
        background-color:#1989fa;
      }
    }
    .#{$drawer}-search{
      .el-input__inner{
        color: #fff;
      }
    }

    .#{$drawer}-user{
      .title{
        color: #fff;
      }
    }
    .el-menu{
      >.el-submenu{
        >.el-submenu__title{
          >.el-submenu__icon-arrow{
            display: none;
          }
        }
      }
    }
    .el-menu--horizontal{
      .el-menu--popup{
        .el-submenu, .el-menu-item{
          &:hover{
            background-color: #fff;
          }
          &.is-active{
            background-color: #1989fa;
          }
        }
      }
    }
  }
  .lay-header-fixed{
    position: fixed;
    top: 0;
  }
}
</style>
