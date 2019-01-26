/* eslint-disable */
import Vue from 'vue'
import router from '@/router'
import $ from 'jquery'
import jquerysession from '@/assets/js/simple/jquerysession'
import '@/assets/js/simple/note'
Vue.config.productionTip = false
export default {
  name: 'CommonHeader',
  template: '<CommonHeader/>',
  router,
  data() {
    return {
      /* eslint-disable */
      loginInfo: null,
    }
  },
  beforeCreated: function () {
  },
  created: function () {
    // var _userInfo = $.parseJSON($.session.get('user'))
    // this.loginInfo = _userInfo;
  },
  destroyed: function () {
    $(window).unbind('scroll');
  },
  mounted: function () {
  },
  methods: {
    login: function () {
      var _routePath = this.$route.path
      console.log('routeName:' + _routePath)
      $.session.set('jumpPath', _routePath)
      this.$router.push({ path: '/login' })
    },
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
