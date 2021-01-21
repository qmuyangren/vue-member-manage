<template>
  <div />
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Callback',
  mounted() {
    this.getInfo()
  },
  methods: {
    ...mapActions('app', ['fetchSingleInfo']),
    getInfo() {
      const { authToken } = this.$route.query
      if (authToken) {
        this.fetchSingleInfo({ authToken }).then(res => {
          if (res.code === 200 && res.data.userType === 1) {
            this.$router.replace('/workplace')
          }
        })
      }
    }
  }
}
</script>
