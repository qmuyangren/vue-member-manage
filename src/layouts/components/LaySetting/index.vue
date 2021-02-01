<template>
  <drawer
    :visible="collapse"
    width="300"
    :on-close="togglerContent"
    title=""
    placement="right"
    :handler="setIcon"
    :on-handle-click="togglerContent"
  >
    <div class="lay-theme">
      <h5 class="lay-theme-title">整体风格设置</h5>
      <div class="lay-theme-body">
        <div class="d-flex flex-row">
          <div v-for="item in themeStyle" :key="item.value" class="nav-item mr-3" @click="setTheme('navTheme', item.value)">
            <el-tooltip class="item" effect="dark" :content="item.label" placement="top">
              <img :src="getImgs(item.value+'.svg')">
            </el-tooltip>
            <div v-if="item.value == themeSet.navTheme" class="selectIcon"><i class="el-icon el-icon-check text-primary" /></div>
          </div>
        </div>
      </div>
      <h5 class="lay-theme-title">主题色</h5>
      <div class="lay-theme-body">
        <lay-theme />
      </div>
      <h5 class="lay-theme-title">导航模式</h5>
      <div class="lay-theme-body">
        <div class="d-flex flex-row">
          <div v-for="item in layoutList" :key="item.value" class="layout-item mr-3" @click="setTheme('layout', item.value)">
            <el-tooltip class="item" effect="dark" :content="item.label" placement="top">
              <img :src="getImgs(item.value+'.svg')">
            </el-tooltip>
            <div v-if="item.value == themeSet.layout" class="selectIcon"><i class="el-icon el-icon-check text-primary" /></div>
          </div>
        </div>
      </div>

      <div class="lay-theme-list-group">
        <div class="lay-theme-list-item">
          <div class="d-flex">
            <div class="mr-auto" :class="getContentClass.className">内容区域宽度</div>
            <div>
              <el-select v-model="contentVal" size="mini" style="width: 80px" :disabled="getContentClass.disabled" placeholder="请选择" @change="setContent">
                <el-option
                  v-for="item in contentWidth"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="lay-theme-list-item">
          <div class="d-flex">
            <div class="mr-auto">固定 Header</div>
            <div><el-switch v-model="themeSet.fixedHeader" @change="setTheme('fixedHeader', '')" /></div>
          </div>
        </div>
        <div class="lay-theme-list-item">
          <div class="d-flex">
            <div class="mr-auto">固定侧边菜单</div>
            <div><el-switch v-model="themeSet.fixSiderbar" :disabled="themeSet.layout === 'topmenu'" @change="setTheme('fixSiderbar', '')" /></div>
          </div>
        </div>
        <div class="lay-theme-list-item">
          <div class="d-flex">
            <div class="mr-auto">显示标签导航</div>
            <div><el-switch v-model="themeSet.tagsView" :disabled="themeSet.layout === 'topmenu'" @change="setTheme('tagsView', '')" /></div>
          </div>
        </div>
      </div>

    </div>
  </drawer>
</template>
<script>
import Drawer from './Drawer'
import LayTheme from './LayTheme'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    Drawer, LayTheme
  },
  data() {
    return {
      collapse: false
    }
  },
  computed: {
    ...mapGetters(['themeSet']),
    ...mapState('app', ['themeStyle', 'layoutList', 'topList', 'sideList', 'colorList']),
    setIcon: function() {
      return this.collapse ? '<i class="el-icon-close text-white" style="font-size: 20px"></i>' : '<i class="el-icon-setting text-white" style="font-size: 20px"></i>'
    },
    getContentClass: function() {
      var classVal = {
        className: [],
        disabled: false
      }
      if (this.themeSet.layout !== 'topmenu') {
        classVal.className = ['text-muted']
        classVal.disabled = true
      }
      return classVal
    },
    contentWidth: function() {
      if (this.themeSet.layout === 'topmenu') {
        return this.topList
      } else {
        return this.sideList
      }
    },
    contentVal: function() {
      return this.themeSet.layout === 'topmenu' ? this.themeSet.contentWidth : 'Fixed'
    }
  },
  methods: {
    togglerContent: function() {
      if (this.collapse) {
        this.collapse = false
        // this.$store.dispatch('setThemeParam', this.themeConfig)
      } else {
        this.collapse = true
      }
    },
    setTheme: function(key, item) {
      if (this.themeSet[key] !== item) {
        this.$store.dispatch('app/changeThemeSet', [key, item])
      }
    },
    setContent: function(item) {
      if (this.themeSet.layout !== item) {
        this.$store.dispatch('app/changeThemeSet', ['contentWidth', item])
      }
    },
    getImgs: (name) => {
      return require(`@/assets/images/setting/${name}`)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  $name: 'lay-theme';
  .#{$name}{
    // .#{$name}-header{
    // }
    .#{$name}-title{
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      padding: 5px 0px;
    }
    .#{$name}-body{
      padding: 10px 0px;
    }

    .#{$name}-list-group{
      display: flex;
      flex-direction: column;
      padding-left: 0; // reset padding because ul and ol
      margin-bottom: 0;
      color: rgba(0,0,0,.65);
    }
    .#{$name}-list-item{
      position: relative;
      display: block;
      padding: .75rem 0rem;
    }
    .nav-item{
      position: relative;
      cursor: pointer;
      .selectIcon{
        position: absolute;
        text-align: center;
        top: 12px;
        left: 24px;
      }
    }
    .color-item{
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
      margin-right: 8px;
    }
    .layout-item{
      position: relative;
      cursor: pointer;
      .selectIcon{
        position: absolute;
        text-align: center;
        top: 12px;
        left: 24px;
      }
    }
  }
</style>
