import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import Header from '@/components/Header'
Vue.use(Toast, {
  type: 'bottom',
  duration: 1000,
  wordWrap: true,
  width: '130px'
})
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
var current
// eslint-disable-next-line
var _lock = false
export default {
  name: 'MineEdit',
  template: '<MineEdit/>',
  components: {
    common_header_view: Header
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
    let _articleId = this.$route.params.articleId
    console.log('hello:' + _articleId)
    let _userInfo = JSON.parse(getItem('user'))
    if (checkNull(_userInfo)) {
      this.$toast.bottom('请先登录')
      return
    }
    current.item = _userInfo
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    doEdit: function (_p) {
      _lock = true
      let _content
      Vue.axios({
        method: 'post',
        url: '/api/v1/user/edit',
        headers: {
        },
        data: {
          flag: _p,
          content: _content
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
    onCompleted: function () {
    }
  }
}
