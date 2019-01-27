import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
// eslint-disable-next-line
import jquerysession from '@/assets/js/simple/jquerysession'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
Vue.use(Toast, {
  type: 'bottom',
  duration: 1000,
  wordWrap: true,
  width: '130px'
})
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
var current
var num = 0
export default {
  name: 'Login',
  template: '<Login/>',
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null,
      count: 0
    }
  },
  beforeCreate: function () {
  },
  created: function () {
    current = this
  },
  beforeDestroy: function () {
  },
  destroyed: function () {
  },
  mounted: function () {
    // 监听
    current.onCompleted()
  },
  methods: {
    //
    doLogin: function () {
      var _tip = '信息不能为空'
      if ($('#password').val() === '' || $('#loginName').val() === '') {
        if (num > 3 && num < 6) {
          _tip = '能不能认真点,老是不对'
        } else if (num >= 6 && num < 10) {
          _tip = '我严重怀疑你到底有没有注册'
        } else if (num >= 10) {
          _tip = '我感觉你在玩我啊'
          if (num === 14) {
            num = 0
          }
        }
        this.$toast.bottom(_tip)
        num++
        return
      }
      Vue.axios({
        method: 'post',
        url: '/api/v1/user/login',
        headers: {
        },
        data: {
          password: $('#password').val(),
          loginName: $('#loginName').val()
        }
      })
        .then(response => {
          if (response.data.code !== 0) {
            this.$toast.bottom('登录失败')
            return false
          }
          var _ret = response.data.data
          if (checkNull(_ret)) {
            this.$toast.bottom('登录失败')
            return false
          }
          // save the login info
          $.session.set('user', JSON.stringify(response.data.data), true)
          current.goBack()
          return true
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    showPwd: function (_p) {
      var pwd = $('.pwd')
      if (pwd.attr('type') === 'password') {
        pwd.attr('type', 'text')
        $(_p).css('color', '#de5252b5')
      } else {
        pwd.attr('type', 'password')
        $(_p).css('color', '#c1b6b6')
      }
    },
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    //
    onCompleted: function () {
    }
  }
}
