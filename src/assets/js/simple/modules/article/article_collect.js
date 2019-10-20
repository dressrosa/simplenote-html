import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull, unbindScroll } from '@/assets/js/simple/common'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
import { getItem, setItem } from '@/assets/js/simple/localstored'
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
var _lock = true
var _pageNum = 1
var _pageSize = 10
export default {
  name: 'ArticleCollect',
  template: '<ArticleCollect/>',
  components: {
    common_header_view: Header
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null,
      isLogin: false
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      let _scrollTop = getItem(vm.$route.name)
      document.body.scrollTop = _scrollTop
      vm.bindScroll()
    })
  },
  beforeRouteLeave: function (to, from, next) {
    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setItem(this.$route.name, _scrollTop)
    to.meta.returnback = false
    unbindScroll()
    next()
  },
  created: function () {
    current = this
    current.getCollects(1, _pageSize)
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getCollects: function (_pageNum, _pageSize) {
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        current.isLogin = true
        _userId = _userInfo.userId
      }
      Vue.axios({
        method: 'get',
        url: '/api/v1/article/collects',
        headers: {
          pageNum: _pageNum,
          pageSize: _pageSize
        },
        params: {
          userId: _userId
        }
      })
        .then(response => {
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          if (response.data.code !== 0) {
            return false
          }
          if (checkNull(response.data.data)) {
            return false
          }
          let _ret = response.data.data
          if (current.items == null) {
            current.items = _ret
          } else {
            _ret.forEach(v => {
              current.items.push(v)
            })
          }
          //  current.$forceUpdate()
          _lock = false
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
        $(window).scroll(function () {
          if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            if (!_lock) {
              _lock = true
              $('.loading').css('visibility', 'visible')
              setTimeout(function () {
                current.getCollects(++_pageNum, _pageSize)
                $('.loading').css('visibility', 'hidden')
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
