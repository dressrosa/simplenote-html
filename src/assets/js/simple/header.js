import Vue from 'vue'
import router from '@/router'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
Vue.config.productionTip = false
export default {
  name: 'CommonHeader',
  template: '<CommonHeader/>',
  router,
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      loginInfo: null,
    }
  },
  beforeCreated: function () {
  },
  created: function () {
  },
  destroyed: function () {
  },
  mounted: function () {
  },
  methods: {
    login: function () {
      var _routePath = this.$route.path
      console.log('routeName:' + _routePath)
      setItem('jumpPath', _routePath)
      this.$router.push({ path: '/login' })
    },
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
