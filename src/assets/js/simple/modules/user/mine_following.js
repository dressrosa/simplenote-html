import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull, unbindScroll } from '@/assets/js/simple/common'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
import Header from '@/components/Header'
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
var _pageNum = 1
var _pageSize = 10
// eslint-disable-next-line
export default {
  name: 'MineFollowing',
  template: '<MineFollowing/>',
  components: {
    common_header_view: Header
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null,
      arItems: [],
      isLogin: false
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      let _scrollTop = getItem(vm.$route.name)
      document.body.scrollTop = _scrollTop
    })
  },
  beforeRouteLeave: function (to, from, next) {
    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setItem(this.$route.name, _scrollTop)
    unbindScroll()
    next()
  },
  created: function () {
    current = this
    current.getFollowing(1, _pageSize)
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getFollowing: function (_pageNum, _pageSize) {
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        current.isLogin = true
        _userId = _userInfo.userId
      }
      _lock = true
      Vue.axios({
        method: 'get',
        url: '/api/v1/user/following',
        headers: {
          pageNum: _pageNum,
          pageSize: _pageSize
        },
        params: {
          userId: _userId
        }
      })
        .then(response => {
          _lock = false
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          if (response.data.code !== 0) {
            return false
          }
          if (checkNull(response.data.data)) {
            return false
          }
          let _ret = response.data.data
          if (_pageNum === 1 && !checkNull(_ret)) {
            current.getLatestArticles(_ret)
          }
          if (current.items == null) {
            current.items = _ret
          } else {
            _ret.forEach(v => {
              current.items.push(v)
            })
          }
        })
        .catch(error => {
          _lock = false
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    getLatestArticles: function (_item) {
      let ids = []
      _item.forEach(v => {
        ids.push(v.userId)
      })
      Vue.axios({
        method: 'get',
        url: '/api/v1/article/latest',
        headers: {
        },
        params: {
          userId: ids
        }
      })
        .then(response => {
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
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    itemClick: function (event) {
      let _articleId = event.currentTarget.getAttribute('article-id')
      this.$router.push({ path: '/article/' + _articleId })
    },
    //
    bindScroll: function () {
      $(function () {
        $(window).scroll(() => {
          let loading = document.getElementsByClassName('loading')[0]
          if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            if (!_lock) {
              _lock = true
              loading.style.visibility = 'visible'
              setTimeout(() => {
                current.getFollowing(++_pageNum, _pageSize)
                loading.style.visibility = 'hidden'
              }, 50)
            }
          }
        })
      })
    },
    //
    onCompleted: function () {
    }
  }
}
