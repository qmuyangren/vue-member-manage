<template>
  <el-container class="lay-layout" :class="layoutClassName()">
    <div v-if="themeSet.layout === 'sidemenu'" class="lay-aside-replace" :class="asideRepClassName()" />
    <lay-aside v-if="themeSet.layout === 'sidemenu'" :class="asideClassName()" :style="getAsideStyle()" />
    <el-container>
      <lay-header />
      <el-main>
        <lay-tags-view />
        <el-container>
          <slot />
        </el-container>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
    <lay-setting />
  </el-container>
</template>
<script>
import LayAside from './module/LayAside'
import LaySetting from './components/LaySetting/index'
import LayHeader from './module/LayHeader'
// import TagsView from './components/TagsView/index'
import LayTagsView from './components/LayTagsView/index'
import { mapGetters } from 'vuex'
export default {
  name: 'BasicLayout',
  components: {
    LayAside, LaySetting, LayHeader, LayTagsView
  },
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar', 'themeSet'
    ])
  },
  mounted() {},
  methods: {
    layoutClassName: function() {
      return [
        this.sidebar.opened ? 'lay-layout-has-sider' : null
      ]
    },
    asideRepClassName: function() {
      return [
        this.sidebar.opened ? 'lay-aside-replace-open' : null
      ]
    },
    asideClassName: function() {
      return [
        'lay-sider-' + this.themeSet.navTheme,
        this.themeSet.fixSiderbar ? 'lay-sider-fixed' : null
      ]
    },
    getAsideStyle: function() {
      return { width: this.sidebar.opened ? '72px' : '208px' }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.lay-aside-replace{
  width: 208px;
  overflow: hidden;
  flex: 0 0 208px;
  max-width: 208px;
  min-width: 208px;
  transition: background-color 0.3s ease 0s,
  min-width 0.3s ease 0s,
  max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  &.lay-aside-replace-open{
    width: 72px;
    overflow: hidden;
    flex: 0 0 72px;
    max-width: 72px;
    min-width: 72px;
  }
}
</style>
