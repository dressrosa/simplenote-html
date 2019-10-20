import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import { getItem, removeItem } from '@/assets/js/simple/localstored'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
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
    common_footer_view: Footer
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null
    }
  },
  beforeRouteLeave: function (to, from, next) {
    to.meta.returnback = false
    next()
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
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
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
          let _flag = response.data.data
          if (_flag) {
            current.items = _userInfo
          } else {
            removeItem('user')
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
    goNotes: function () {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/notes' })
    },
    goArticles: function () {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/articles' })
    },
    goCollects: function () {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/collects/articles' })
    },
    goFollowing: function () {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/following' })
    },
    goComments: function () {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/comments' })
    },
    goEdit: function () {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return
      }
      this.$router.push({ path: '/mine/edit' })
    },
    avatarClick: function (event) {
      let _userId = event.currentTarget.id
      window.location.href = '/user/' + _userId
    },
    //
    onCompleted: function () {
    }
  }
}
