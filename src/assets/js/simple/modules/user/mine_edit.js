import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
import '@/assets/js/simple/note'
// eslint-disable-next-line
import jquerysession from '@/assets/js/simple/jquerysession'
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
    var _articleId = this.$route.params.articleId
    console.log('hello:' + _articleId)
    var _userInfo = $.parseJSON($.session.get('user'))
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
      var _content
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
          if (response.data.code !== 0) {
            return false
          }
          if (checkNull(response.data.data)) {
            return false
          }
          var _ret = response.data.data
          current.arItems = _ret
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    onCompleted: function () {
    }
  }
}
