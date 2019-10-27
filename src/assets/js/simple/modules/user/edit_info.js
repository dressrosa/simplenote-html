import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import { getItem, setItem } from '@/assets/js/simple/localstored'
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
        current.$toast.top('请先登录')
        return false
      }
      _token = _userInfo.token
      _userId = _userInfo.userId
      let content = document.getElementById('editContent').value
      let mo = this.$route.params.module

      if (checkNull(content)) {
        current.$toast.top('不能为空')
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
            if (response.data.code === 20001) {
              current.$toast.top('请重新登录')
              return false
            }
            current.$toast.top('修改失败')
            return false
          }
          current.$toast.top('修改成功')
          if (current.item === '1') {
            _userInfo.signature = content
          } else if (current.item === '2') {
            _userInfo.description = content
          } else if (current.item === '3') {
            _userInfo.nickname = content
          }
          setItem('user', JSON.stringify(_userInfo))
          current.goBack()
        })
        .catch(error => {
          _lock = false
          current.$toast.top('修改失败')
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    //
    onCompleted: function () {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return
      }
      current.item = this.$route.params.module
      let va = ''
      if (current.item === '1') {
        va = _userInfo.signature
      } else if (current.item === '2') {
        va = _userInfo.description
      } else if (current.item === '3') {
        va = _userInfo.nickname
      }
      document.getElementById('editContent').value = va
    }
  }
}
