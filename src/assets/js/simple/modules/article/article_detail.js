// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
import VueShowdown from 'vue-showdown'
import hljs from 'highlight.js'
import jquerysession from '@/assets/js/simple/jquerysession'
import { zoom } from '@/assets/js/other/pinchzoom'
import '@/assets/js/simple/note'
import 'highlight.js/styles/github.css'
Vue.use(VueAxios, axios)
Vue.use(VueShowdown, {
  options: {
    emoji: false
  }
})
var detail
export default {
  name: 'articleDetail',
  template: '<ArticleDetail/>',
  router,
  data() {
    return {
      /* eslint-disable */
      headForImg: imgHead,
      item: {},
      commentsItems: null
    }
  },
  mounted: function () {
    detail = this
    detail.getArticleDetail()
    detail.onCompleted()
  },
  methods: {
    getArticleDetail: function () {
      var _token = ''
      var _userId = ''
      $(function () {
        var _userInfo = $.parseJSON($.session.get('user'))
        if (!checkNull(_userInfo)) {
          _token = _userInfo.token
          _userId = _userInfo.userId
        }
      })
      var _articleId = this.$route.params.articleId
      Vue.axios.get('/api/v1/article/' + _articleId, {
        headers: {
          token: _token,
          userId: _userId
        },
        params: {
        }
      })
        .then(response => {
          if (response.data.code !== 0) {
            window.location.href = '/common/404'
            return false
          }
          var ar = response.data.data
          if (checkNull(ar)) {
            window.location.href = '/common/404'
            return false
          }
          detail.item = ar
          detail.$nextTick(function () {
            detail.pinch()
          })
          return true
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    getComments: function () {
      var _token = ''
      var _userId = ''
      $(function () {
        var _userInfo = $.parseJSON($.session.get('user'))
        if (!checkNull(_userInfo)) {
          _token = _userInfo.token
          _userId = _userInfo.userId
        }
      })
      var _articleId = this.$route.params.articleId
      Vue.axios.get('/api/v1/article/' + _articleId + '/new-comments', {
        headers: {
          token: _token,
          userId: _userId
        },
        params: {
        }
      })
        .then(response => {
          if (response.data.code !== 0) {
            return false
          }
          var cos = response.data.data
          if (checkNull(cos)) {
            return false
          }
          detail.commentsItems = cos
          //detail.$forceUpdate()
          return true
        })
        .catch(error => {
          console.log(error)
        })
    },
    pinch: function () {
      $(function () {
        $('.ar_content').find('img').each(function (i) {
          var _this = $(this)
          _this.attr('width', '100%')
          var src = _this.attr('src')
          _this.bind('click', function () {
            var t = $('#bigImgdiv')
            var c = $('#bigimg').attr('src')
            if (c === undefined || c === 'undefined') {
              $('<div id="bigImgdiv" style="position: fixed;z-index: 1000;top: 0;left: 0;' +
                '-webkit-user-drag: none;-moz-user-drag: none;-ms-user-drag: none;user-drag: none;' +
                'width: 100%;height: 100%;background-color: rgba(255,255,255,0.9);display:none;">' +
                '<img id="bigimg" style="height: 100%;width: 100%;border: 0;' +
                'margin:0 auto;" src="' + src + '" /></div>')
                .appendTo('body')
              zoom('bigimg', {})
            }
            t = $('#bigImgdiv')
            $('#bigimg').attr('src', src)
            t.attr('display', 'block')
            t.fadeIn('fast')
            $('#bigImgdiv').click(function () {
              $(this).attr('display', 'none')
              $(this).fadeOut('fast')
            })
          })
        })
        $('pre code').each(function (i, block) {
          hljs.highlightBlock(block)
        })
      })
    },
    getAllComments: function () {
      var _articleId = this.$route.params.articleId
      this.$router.push({ path: '/article/' + _articleId + '/comments' })
    },
    onCompleted: function () {
      detail.getComments()
    }
  }
}
