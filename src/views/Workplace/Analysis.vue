<template>
  <div>分析页</div>
</template>
<script>
export default {
  name: 'Analysis',
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      console.log(this)
      this.$request.fetchArticlePage().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
