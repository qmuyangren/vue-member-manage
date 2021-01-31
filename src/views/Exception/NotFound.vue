<template>
  <section class="not-found-container">
    <img src="../../assets/images/404.svg" alt="">
    <div class="btn-wrap">
      <el-button type="primary" size="medium" @click="handleClick">
        <lay-icon icon-class="fanhui" />返回上一页
      </el-button>
      <el-button type="primary" size="medium" @click="handleLogin">
        <lay-icon icon-class="fanhui" />重新登录
      </el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'NotFound',
  methods: {
    handleClick() {
      this.$router.go(-1)
    },
    handleLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
.not-found-container{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btn-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
}
</style>
