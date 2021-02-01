<template>
  <basic-layout>
    <RouteView />
  </basic-layout>
</template>
<script>
import BasicLayout from './BasicLayout.vue'
import RouteView from './components/RouteView'
export default {
  name: 'Layout',
  components: {
    BasicLayout, RouteView
  }
}
</script>
