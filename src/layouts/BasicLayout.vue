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
    ]),
    navTheme() {
      if (this.themeSet.navTheme === 'dark' || this.themeSet.layout === 'topmenu') {
        return 1
      } else {
        return 0
      }
    }
  },
  watch: {
    navTheme(n) {
      var bodyEle = document.getElementsByTagName('body')[0]
      bodyEle.setAttribute('class', '')
      if (n) {
        bodyEle.setAttribute('class', 'lay-dark')
      }
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
<style>
.lay-layout{
  width: 100%;
  min-height: 100%;
  align-items: stretch!important;
}
</style>
