// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
import '@/assets/js/simple/note'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
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
var home
var _lock = true
var _pageNum = 1
export default {
  name: 'home',
  template: '<Home/>',
  router,
  data() {
    return {
      /* eslint-disable */
      headForImg: imgHead,
      items: null
    }
  },
  created: function () {
    home = this
    $('.header').addClass('transparent_header')
  },
  destroyed: function () {
    $(window).unbind('scroll');
    $('.header').removeClass('transparent_header')
  },
  mounted: function () {
    // 监听
    _pageNum = 1
    home.onCompleted()
  },
  methods: {
    getHotList: function (_pageNum, _pageSize) {
      var _token = ''
      var _userId = ''
      $(function () {
        var _userInfo = $.parseJSON($.session.get('user'))
        if (!checkNull(_userInfo)) {
          _token = _userInfo.token
          _userId = _userInfo.userId
        }
      })
      Vue.axios.get('/api/v1/home', {
        headers: {
          pageNum: _pageNum,
          pageSize: _pageSize,
          token: _token,
          userId: _userId
        },
        params: {
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
          if (home.items == null) {
            home.items = _ret
          } else {
            _ret.forEach(v => {
              home.items.push(v)
            });
          }
          //  home.$forceUpdate()
          _lock = false
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    itemClick: function (event) {
      var _articleId = event.currentTarget.id
      this.$router.push({ path: '/article/' + _articleId })
    },
    avatarClick: function (event) {
      var _userId = event.currentTarget.id
      window.location.href = '/user/' + _userId
    },
    heartClick: function (event) {
      var _userInfo = $.parseJSON($.session.get('user'))
      if (checkNull(_userInfo)) {
        this.$toast.bottom('请先登录')
        $.session.remove('user')
        return false
      }
      var _cur = event.currentTarget
      var _articleId = event.currentTarget.getAttribute('article-id')
      var $next = $(_cur).next()
      var num = $next.html()
      var _isCollect
      if (event.currentTarget.getAttribute('data-heart') === '0') {
        $(_cur).css('color', '#fd4d4d')
        $(_cur).attr('data-heart', '1')
        $next.html(num - (-1))
        _isCollect = 0
      } else if ($(_cur).attr('data-heart') === '1') {
        $(_cur).css('color', '#a7a7a7')
        $(_cur).attr('data-heart', '0')
        $next.html(num - 1)
        _isCollect = 1
      }
      var _token = ''
      var _userId = ''
      $(function () {
        var _userInfo = $.parseJSON($.session.get('user'))
        if (!checkNull(_userInfo)) {
          _token = _userInfo.token
          _userId = _userInfo.userId
        }
      })
      Vue.axios({
        method: 'post',
        url: '/api/v1/article/collect',
        headers: {
          token: _token,
          userId: _userId
        },
        data: {
          articleId: _articleId,
          isCollect: _isCollect
        }
      }).then(response => {
        var obj = response.data
        if (obj.code === '20001') {
          this.$toast.bottom('请先登录')
          $.session.remove('user')
          return false
        }
        return true
      }).catch(error => {
        console.log(error)
      })
    },
    commentClick: function (event) {
      var _articleId = event.currentTarget.getAttribute('article-id')
      this.$router.push({ path: '/article/' + _articleId + '/comments' })
    },
    likeClick: function (event) {
      var _cur = event.currentTarget
      var _articleId = _cur.getAttribute('article-id')
      var $next = $(_cur).next()
      var num = $next.html()
      var _isLike
      if ($(_cur).attr('data-like') === '0') {
        $(_cur).css('color', '#fd4d4d')
        $(_cur).attr('data-like', '1')
        $next.html(num - (-1))
        _isLike = 0
      } else if ($(_cur).attr('data-like') === '1') {
        $(_cur).css('color', '#a7a7a7')
        $(_cur).attr('data-like', '0')
        $next.html(num - 1)
        _isLike = 1
      }
      var _token = ''
      var _userId = ''
      $(function () {
        var _userInfo = $.parseJSON($.session.get('user'))
        if (!checkNull(_userInfo)) {
          _token = _userInfo.token
          _userId = _userInfo.userId
        }
      })
      Vue.axios.post('/api/v1/article/like', {
        headers: {
          token: _token,
          userId: _userId
        },
        params: {
          articleId: _articleId,
          isLike: _isLike
        }
      }).then(response => {
        var obj = response.data
        if (obj.code === '20001') {
          console.log('未登录')
          $.session.remove('user')
        }
        return true
      }).catch(error => {
        console.log(error)
      })
    },
    onCompleted: function () {
      $(function () {
        var _pageSize = 10
        home.getHotList(_pageNum, _pageSize)
        $(window).scroll(function () {
          var _top = document.documentElement.scrollTop
          if (_top > 300) {
            $('.top_n1_info').css('opacity', 1)
            $('.header').find('.search_span1').css('display', 'flex')
            $('.header').find('.user_dropdown').css('background', '#d64444')
            $('.header').removeClass('transparent_header')
            $('.top_n1').find('.search_span').css('display', 'none')
          } else {
            $('.top_n1_info').css('opacity', 1 - _top / 300.0)
            $('.header').find('.search_span1').css('display', 'none')
            $('.top_n1').find('.search_span').css('display', 'table')
            $('.header').addClass('transparent_header')
            $('.header').find('.user_dropdown').css('background', 'rgba(214, 68, 68, 0)')
          }
          if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            if (!_lock) {
              _lock = true
              $('.loading').css('visibility', 'visible')
              setTimeout(function () {
                home.getHotList(++_pageNum, _pageSize)
                $('.loading').css('visibility', 'hidden')
              }, 50)
            }
          }
        })
      })
    }

  }
}
