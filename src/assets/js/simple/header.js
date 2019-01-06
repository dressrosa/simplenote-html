/* eslint-disable */
import Vue from 'vue'
import router from '@/router'
import $ from 'jquery'
import jquerysession from '@/assets/js/simple/jquerysession'
import '@/assets/js/simple/note'
Vue.config.productionTip = false
export default {
  name: 'home',
  template: '<Home/>',
  router,
  data() {
    return {
      /* eslint-disable */
      loginInfo: null,
    }
  },
  created: function () {
    var _userInfo = $.parseJSON($.session.get('user'))
    this.loginInfo = _userInfo;
  },
  destroyed: function () {
    $(window).unbind('scroll');
  },
  mounted: function () {
  }
}
