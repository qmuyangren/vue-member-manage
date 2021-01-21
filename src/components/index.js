import Vue from 'vue'

const contexts = require.context('./common', false, /\.vue$/)
contexts.keys().forEach(component => {
  const componentEntity = contexts(component).default
  Vue.component(componentEntity.name, componentEntity)
})
