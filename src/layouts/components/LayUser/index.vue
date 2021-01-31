<template>
  <div class="lay-header-user">
    <el-dropdown placement="top">
      <span class="el-dropdown-link d-flex align-items-center"><img :src="userAvatar" class="rounded-circle mr-2" style="width: 24px; height:24px"><span class="title">{{ userName }}</span></span>
      <el-dropdown-menu slot="dropdown" style="min-width: 160px;" class="lay-user-menu">
        <el-dropdown-item @click.native="gotoMember('settings')"><lay-icon icon-class="setting" class="mr-2" />帐号设置</el-dropdown-item>
        <el-dropdown-item @click.native="gotoMember('center')"><lay-icon icon-class="user" class="mr-2" />个人中心</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout"><lay-icon icon-class="logout" class="mr-2" />退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'CurrentUser',
  data() {
    return {
      userName: window.localStorage.getItem('userName'),
      userAvatar: window.localStorage.getItem('userAvatar')
    }
  },
  methods: {
    gotoMember(name) {

    },
    logout() {
      this.$store.dispatch('user/fetchLogout').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>
