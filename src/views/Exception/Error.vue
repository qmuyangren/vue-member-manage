<template>
  <section class="error-container">
    <img src="../../assets/images/500.svg" alt="">
    <div class="btn-wrap">
      <el-button type="primary" size="medium" @click="handleClick">
        <lay-icon icon-class="fanhui" />返回上一页
      </el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Error',
  methods: {
    handleClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.error-container{
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
