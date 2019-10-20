import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import { setItem } from '@/assets/js/simple/localstored'
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
// eslint-disable-next-line
var _lock = false
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
      let _tip = '信息不能为空'
      let pas = document.getElementById('password')
      let loginName = document.getElementById('loginName')
      if (pas.value === '' || loginName.value === '') {
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
        current.$toast.bottom(_tip)
        num++
        return
      }
      _lock = true
      Vue.axios({
        method: 'post',
        url: '/api/v1/user/login',
        headers: {
        },
        data: {
          password: pas.value,
          loginName: loginName.value
        }
      })
        .then(response => {
          _lock = false
          if (response.data.code !== 0) {
            current.$toast.bottom('登录失败')
            return false
          }
          let _ret = response.data.data
          if (checkNull(_ret)) {
            current.$toast.bottom('登录失败')
            return false
          }
          // save the login info
          setItem('user', JSON.stringify(response.data.data))
          current.goBack()
          return true
        })
        .catch(error => {
          _lock = false
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    showPwd: function (event) {
      let pwd = document.getElementsByClassName('pwd')[0]
      if (pwd.getAttribute('type') === 'password') {
        pwd.attr('type', 'text')
        event.currentTarget.style.color = '#de5252b5'
      } else {
        pwd.setAttribute('type', 'password')
        event.currentTarget.style.color = '#c1b6b6'
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
