<template>
  <div class="route-view-container scrollbar">
    <!--缓存想要缓存的页面，实现后退不刷新-->
    <!--加上v-if的判断，可以自定义想要缓存的组件，自定义在router里面-->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="includes">
        <router-view :key="key" />
      </keep-alive>
    </transition>

    <!-- 1.将路由元信息中包含keepAlive: true的路由记录下来，并将该路由的name属性为维护在使用vuex中的一个keepAliveList: []里。 (includes)
2.使用<keep-alive>的include属性，来实现动态的组件缓存。
先说一下include属性，它的值可以是：字符串，正则表达式，数组
首先我们需要知道keep-alive可以根据include中的值来匹配当前路由对应组件的name属性（！！不是路由的name哦，是组件的name），来判断这个路由中的组件是否需要缓存。因此我们只需要将keepAliveList: []里保存的需要缓存的路由组件name数组传入include即可
因此使用起来就像这样 -->
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'RouteView',
  computed: {
    ...mapState('permission', ['includes']),
    key() {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped>
.route-view-container{
  height: calc(100% - 43.5px);
  overflow-x: hidden;
  overflow-y: overlay;
  box-sizing: border-box;
}
</style>
