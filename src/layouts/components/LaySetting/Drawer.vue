<template>
  <div class="lay-drawer" :class="getDrawerClassName()" :style="getDrawerStyle()">
    <div v-if="mask" class="lay-drawer-mask" :style="maskStyle" @click="onCloseDrawer" />
    <div class="lay-drawer-wrapper" :style="getWrapperStyle()">
      <div class="lay-drawer-wrapper-content">
        <div class="lay-drawer-wrapper-body">
          <div v-if="title != ''" class="lay-drawer-header"><div class="lay-drawer-title">{{ title }}</div></div>
          <button v-if="closable" type="button" class="lay-drawer-close" @click="onCloseDrawer"><span class="lay-drawer-close-x"><i class="el-icon-close" /></span></button>
          <div class="lay-drawer-body" :style="setStyle">
            <slot />
          </div>
        </div>
      </div>
      <div v-if="handler != ''" class="lay-drawer-handle el-button--primary" @click="onHandleClick" v-html="handler" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayDrawer',
  props: {
    closable: {
      // 是否显示右上角的关闭按钮
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      // 关闭时销毁 Drawer 里的子元素
      type: Boolean,
      default: false
    },
    // 指定 Drawer 挂载的 HTML 节点
    // getContainer: {},
    maskClosable: {
      // 点击蒙层是否允许关闭
      type: Boolean,
      default: true
    },
    mask: {
      // 是否展示遮罩
      type: Boolean,
      default: true
    },
    maskStyle: {
      // 遮罩样式
      type: Object,
      default: () => { return {} }
    },
    setStyle: {
      // 可用于设置 Drawer 的样式，调整浮层位置等
      type: Object,
      default: () => { return {} }
    },
    title: {
      // 标题
      type: String,
      default: '这是一个抽屉组件'
    },
    visible: {
      // Drawer 是否可见
      type: Boolean,
      default: true
    },
    width: {
      // 宽度
      type: [Number, String],
      default: 240
    },
    height: {
      // 高度, 在 placement 为 top 或 bottom 时使用
      type: [Number, String],
      default: 240
    },
    // className: { // 对话框外层容器的类名
    //   type: String
    // },
    zIndex: {
      // 设置Drawer 的 z-index
      type: Number,
      default: 1000
    },
    placement: {
      // 抽屉的方向 'top' | 'right' | 'bottom' | 'left'
      type: String,
      default: 'right'
    },
    onClose: { // 点击遮罩层或右上角叉或取消按钮的回调
      type: Function,
      default: () => {}
    },
    handler: {
      type: String,
      default: ''
    },
    onHandleClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isVisible: this.visible
    }
  },
  // computed: {
  //   isVisible: function() {
  //     return this.visible
  //   }
  // },
  watch: {
    visible: function(val) {
      this.isVisible = val
      this.setBodyScroll()
    }
  },
  mounted() {
    this.setBodyScroll()
  },
  methods: {
    getDrawerClassName: function() {
      return [
        this.isVisible ? 'lay-drawer-open' : null,
        'lay-drawer-' + this.placement
      ]
    },
    getDrawerStyle: function() {
      var getStyle = {}
      if (this.zIndex !== 1000) { getStyle.zIndex = this.zIndex }
      if (this.placement === 'left' || this.placement === 'right') {
        getStyle.transition = 'transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86) 0s, width 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86) 0s;'
      } else {
        getStyle.transition = 'transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86) 0s, height 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86) 0s;'
      }
      return getStyle
    },
    setBodyScroll: function() {
      if (this.isVisible) {
        document.querySelector('body').setAttribute('style', 'overflow:hidden; position:relative;width:calc(100% - 17px)')
      } else {
        document.querySelector('body').removeAttribute('style')
      }
    },
    getWrapperStyle: function() {
      var getStyle = {}
      if (this.placement === 'left' || this.placement === 'right') { getStyle.width = this.width + 'px' } else { getStyle.height = this.height + 'px' }
      if (!this.isVisible) { if (this.placement === 'left' || this.placement === 'right') { getStyle.transform = 'translateX(100%)' } else { getStyle.transform = 'translateY(100%)' } }
      return getStyle
    },
    onCloseDrawer: function() {
      this.isVisible = false
      this.onClose()
    }
  }
}
</script>
