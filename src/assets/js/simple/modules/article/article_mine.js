// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
import '@/assets/js/simple/note'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
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
var _lock = true
var _pageNum = 1
var _pageSize = 12
export default {
  name: 'ArticleMine',
  template: '<ArticleMine/>',
  components: {
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
      var _scrollTop = $.session.get(vm.$router.name)
      document.body.scrollTop = _scrollTop
    })
  },
  beforeRouteLeave: function (to, from, next) {
    var _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    $.session.set(this.$route.name, _scrollTop, true)
    to.meta.returnback = false
    next()
  },
  created: function () {
    current = this
    current.getArticles(1, _pageSize)
  },
  destroyed: function () {
    $(window).unbind('scroll')
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getArticles: function (_pageNum, _pageSize) {
      var _userId = ''
      var _userInfo = $.parseJSON($.session.get('user'))
      if (!checkNull(_userInfo)) {
        current.isLogin = true
        _userId = _userInfo.userId
      }
      Vue.axios({
        method: 'get',
        url: '/api/v1/article/list',
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
          var _ret = response.data.data
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
      var _articleId = event.currentTarget.getAttribute('article-id')
      this.$router.push({ path: '/article/' + _articleId })
    },
    goComment: function (event) {
      var _articleId = event.currentTarget.getAttribute('article-id')
      this.$router.push({ path: '/article/' + _articleId + '/comments' })
    },
    goEdit: function (event) {
      var _articleId = event.currentTarget.getAttribute('article-id')
      this.$router.push({ path: '/article/edit/' + _articleId })
    },
    //
    doConfirmCallback: function (_articleId) {
      this.$router.push({ path: '/article/edit/' + _articleId })
    },
    //
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    //
    onCompleted: function () {
      $(function () {
        $(window).scroll(function () {
          if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            if (!_lock) {
              _lock = true
              $('.loading').css('visibility', 'visible')
              setTimeout(function () {
                current.getArticles(++_pageNum, _pageSize)
                $('.loading').css('visibility', 'hidden')
              }, 50)
            }
          }
        })
      })
    }
  }
}
