import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
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
var _lock = false
export default {
  name: 'EditInfo',
  template: '<EditInfo/>',
  components: {
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      item: null
    }
  },
  created: function () {
    current = this
    let _userInfo = JSON.parse(getItem('user'))
    if (checkNull(_userInfo)) {
      current.$toast.bottom('请先登录')
      return
    }
    current.item = this.$route.params.module
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    edit: function () {
      if (_lock) {
        return
      }
      let _userId = ''
      let _token = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return false
      }
      _token = _userInfo.token
      _userId = _userInfo.userId
      let content = document.getElementById('editContent').value
      let mo = this.$route.params.module

      if (checkNull(content)) {
        current.$toast.bottom('不能为空')
        return false
      }
      _lock = true
      Vue.axios({
        method: 'post',
        url: '/api/v1/user/edit',
        headers: {
          'token': _token,
          'userId': _userId
        },
        data: {
          flag: mo,
          content: content
        }
      })
        .then(response => {
          _lock = false
          if (response.data.code !== 0) {
            return false
          }
          if (checkNull(response.data.data)) {
            return false
          }
          let _ret = response.data.data
          current.arItems = _ret
        })
        .catch(error => {
          _lock = false
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    //
    onCompleted: function () {
    }
  }
}
