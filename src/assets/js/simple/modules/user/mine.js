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
import Footer from '@/components/Footer'
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
  name: 'Mine',
  template: '<Mine/>',
  components: {
    common_footer_view: Footer,
    common_header_view: Header
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null
    }
  },
  created: function () {
    current = this
    current.freshLoginInfo()
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    //
    freshLoginInfo: function () {
      var _token = ''
      var _userId = ''
      var _userInfo = $.parseJSON($.session.get('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      Vue.axios({
        method: 'get',
        url: '/api/v1/user/loginInfo',
        headers: {
          'token': _token,
          'userId': _userId
        },
        data: {
        }
      })
        .then(response => {
          var _flag = response.data.data
          if (_flag) {
            current.items = _userInfo
          } else {
            $.session.remove('user')
          }
          return true
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    //
    goLogin: function () {
      this.$router.push({ path: '/login' })
    },
    goArticles: function () {
      var _userInfo = $.parseJSON($.session.get('user'))
      if (checkNull(_userInfo)) {
        this.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/articles' })
    },
    goCollects: function () {
      var _userInfo = $.parseJSON($.session.get('user'))
      if (checkNull(_userInfo)) {
        this.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/collects/articles' })
    },
    goFollowing: function () {
      var _userInfo = $.parseJSON($.session.get('user'))
      if (checkNull(_userInfo)) {
        this.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/following' })
    },
    goComments: function () {
      var _userInfo = $.parseJSON($.session.get('user'))
      if (checkNull(_userInfo)) {
        this.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/comments' })
    },
    goEdit: function () {
      var _userInfo = $.parseJSON($.session.get('user'))
      if (checkNull(_userInfo)) {
        this.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/edit' })
    },
    avatarClick: function (event) {
      var _userId = event.currentTarget.id
      window.location.href = '/user/' + _userId
    },
    //
    onCompleted: function () {
    }
  }
}
