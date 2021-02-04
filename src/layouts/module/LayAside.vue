<template>
  <el-aside class="lay-sider" :style="setAsideStyle()" :class="setAsideClass()">
    <div class="lay-aside-children" :class="setAsideChildrenClass()" :style="setAsideStyle()">
      <transition name="sidebarLogoFade">
        <div class="lay-sider-logo">
          <router-link to="/"><img src="../../assets/logo.svg"> <h1 v-if="!sidebar.opened">{{ title }}</h1></router-link>
        </div>
      </transition>
      <el-scrollbar wrap-class="sidebar-scrollbar" style="flex: 1 1 0%;">
        <lay-menu />
      </el-scrollbar>
      <lay-aside-link v-if="device !== 'mobile'" class="lay-aside-link" :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
    </div>
  </el-aside>
</template>
<script>
import LayMenu from '../components/LayMenu/index'
import LayAsideLink from '../components/LayAsideLink/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    LayMenu, LayAsideLink
  },
  data() {
    return {
      title: 'Ant Design Pro'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar', 'themeSet', 'device'
    ])
  },
  mounted() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    setAsideClass() {
      return [this.themeSet.navTheme === 'dark' ? 'lay-sider-dark' : 'lay-sider-light']
    },
    setAsideChildrenClass() {
      return [this.themeSet.fixSiderbar ? 'lay-sider-fixed' : '']
    },
    setAsideStyle() {
      if (this.device === 'mobile') {
        return { width: '208px' }
      } else {
        return { width: this.sidebar.opened ? '72px' : '208px' }
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  /*.el-scrollbar__wrap {*/
  /*overflow-x: hidden;*/
  /*}*/

  .lay-sider{
    position: relative;
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
    z-index: 13;
    .lay-aside-children{
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .lay-sider-logo{
      position: relative;
      display: flex;
      align-items: center;
      padding: 16px 12px 16px 20px;
      cursor: pointer;
      transition: padding .3s cubic-bezier(.645,.045,.355,1);
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 32px;
        &:hover{
          text-decoration: none;
        }
        img{
          display: inline-block;
          vertical-align: middle;
          height: 32px;
        }
         h1{
          display: inline-block;
          height: 32px;
          margin: 0 0 0 12px;
          font-weight: 600;
          font-size: 18px;
          line-height: 32px;
          vertical-align: middle;
          animation: pro-layout-title-hide .3s;
        }
      }
    }
    .lay-aside-link{
      cursor: pointer;
      border-top: 1px solid transparent;
      width: 100%;
      padding: 8px 20px;
      svg{
        margin-left: 6px;
      }
    }
    .el-menu {
      font-feature-settings: "tnum","tnum";
      font-variant: tabular-nums;
      background-color: transparent;
      border-right: 0px;
       .el-submenu{
         font-size: 14px;
         >.el-submenu__title{
           height: 48px;
           line-height: 48px;
           .lay-svg-icon{
           width: 1em;
           height: 1em;
           vertical-align: middle;
           margin-right: 10px;
           transition: width .3s, height .3s;
         }
         }
       }
       > .el-menu-item{
         height: 48px;
         line-height: 48px;
         .lay-svg-icon{
           width: 1em;
           height: 1em;
           vertical-align: middle;
           margin-right:8px;
           transition: width .3s, height .3s;
         }
         &:last-child{
         }
       }
    }
     .el-menu--collapse{
       width: 72px;
       >.el-menu-item [class^=el-icon-],
       >.el-submenu>.el-submenu__title [class^=el-icon-]{
         margin-left: 4px;
         font-size: 18px;
       }
     }
     .el-menu--collapse{
       >.el-menu-item .lay-svg-icon,
       >.el-submenu>.el-submenu__title .lay-svg-icon{
         width: 1.15em;
         height: 1.15em;
         margin-left: 6px;
         margin-right: 0px;
         transition: width .3s, height .3s;
       }
     }
  }
   .lay-sider-dark{
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
     .el-scrollbar__view{
        >.el-menu{
          background-color: #000c17;
          >.el-submenu{
            >.el-submenu__title{
              // color: hsla(0,0%,100%,.65);
              background-color: #001529;
            }
            &.is-active{
              >.el-submenu__title{
                // color: hsla(0,0%,100%,.65);
                color: #fff;
              }
            }
            .el-menu.el-menu--inline{
              .el-submenu{
                &:hover{
                  background-color: transparent;
                  .el-submenu__title{
                    background-color: transparent;
                  }
                }
              }
              .el-menu-item{
                &:hover{
                  background-color: transparent;
                }
              }
            }
          }
          >.el-menu-item{
            background-color: #001529;
          }
        }
      }
      .el-menu{
        .el-submenu{
          .el-submenu__title{
            color: hsla(0,0%,100%,.65);
          }
          &.is-opened{
            >.el-submenu__title{
              color:#fff;
            }
          }
          &:hover{
            .el-submenu__title{
              color: #fff;
            }
          }
        }
        .el-menu-item{
          color: hsla(0,0%,100%,.65);
          &:hover{
            color: #fff;
          }
          &.is-active{
            background-color: #1890ff;
            color: #fff;
          }
        }
     }
   }
   .lay-sider-light{
     .lay-aside-children{
      background-color: #fff;
     }
     .lay-sider-logo{
       a{color:rgba(0,0,0,.85);}
     }
     .lay-aside-link{
       border-color:rgba(0,0,0,.25);
       svg{fill: #000;}
     }
     .el-scrollbar__view{
        >.el-menu{
          background-color: #fff;
          >.el-submenu{
            >.el-submenu__title{
              // color: hsla(0,0%,100%,.65);
              background-color: #fff;
            }
            &.is-active{
              >.el-submenu__title{
                // color: hsla(0,0%,100%,.65);
                color: #1890ff;
              }
            }
            .el-menu.el-menu--inline{
              .el-submenu{
                &:hover{
                  background-color: transparent;
                  .el-submenu__title{
                    background-color: transparent;
                  }
                }
              }
              .el-menu-item{
                &:hover{
                  background-color: transparent;
                }
              }
            }
          }
          >.el-menu-item{
            background-color: #fff;
          }
        }
      }
      .el-menu{
        .el-submenu{
          .el-submenu__title{
            color:rgba(0,0,0,.85);
          }
          &.is-opened{
            >.el-submenu__title{
              color:rgba(0,0,0,.85);
            }
          }
          &.is-active{
            >.el-submenu__title{
              color:#1890ff;
            }
          }
          &:hover{
            >.el-submenu__title{
              color: #1890ff;
            }
          }
        }
        .el-menu-item{
          color:rgba(0,0,0,.85);;
          &:hover{
            color: #1890ff;;
          }
          &.is-active{
            background-color: #e6f7ff;
            border-right: 2px solid #1890ff;
            color: #1890ff;
          }
        }
     }
   }

  .lay-sider-fixed{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .sidebar-scrollbar{
    overflow-x: hidden !important;
  }
</style>
