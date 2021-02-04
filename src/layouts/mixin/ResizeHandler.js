import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
export default {
  data() {
    return {
      query: {
        'screen-xs': {
          maxWidth: 575
        },
        'screen-sm': {
          minWidth: 576,
          maxWidth: 767
        },
        'screen-md': {
          minWidth: 768,
          maxWidth: 991
        },
        'screen-lg': {
          minWidth: 992,
          maxWidth: 1199
        },
        'screen-xl': {
          minWidth: 1200,
          maxWidth: 1599
        },
        'screen-xxl': {
          minWidth: 1600
        }
      }
    }
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_widths() {
      debugger
      const rect = body.getBoundingClientRect()
      let containerNames = ''
      if (rect.width <= this.query['screen-xs'].maxWidth) { containerNames = 'screen-xs' }
      if (rect.width >= this.query['screen-sm'].minWidth && rect.width <= this.query['screen-sm'].maxWidth) { containerNames = 'screen-sm' }
      if (rect.width >= this.query['screen-md'].minWidth && rect.width <= this.query['screen-md'].maxWidth) { containerNames = 'screen-md' }
      if (rect.width >= this.query['screen-lg'].minWidth && rect.width <= this.query['screen-lg'].maxWidth) { containerNames = 'screen-lg' }
      if (rect.width >= this.query['screen-xl'].minWidth && rect.width <= this.query['screen-xl'].maxWidth) { containerNames = 'screen-xl' }
      if (rect.width >= this.query['screen-xxl'].minWidth) { containerNames = 'screen-xxl' }
      return containerNames
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        var bodyEle = document.getElementsByTagName('body')[0]
        bodyEle.setAttribute('class', this.$_widths())
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
