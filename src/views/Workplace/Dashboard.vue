<template>
  <div>
    <h1>工作台</h1>
    <p v-for="index in number" :key="index">{{ index }}</p>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      number: 100
    }
  }
}
</script>
