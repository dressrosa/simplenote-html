import Vue from 'vue'
import router from '@/router'
Vue.config.productionTip = false
export default {
  name: 'NotFound',
  template: '<NotFound/>',
  router,
  // eslint-disable-next-line
  data() {
    return {
    }
  },
  methods: {
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
