// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
import VueShowdown from 'vue-showdown'
import hljs from 'highlight.js'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
import { zoom } from '@/assets/js/other/pinchzoom'
import 'highlight.js/styles/github.css'
import Header from '@/components/Header'
const ArticleDetailContent = resolve => {
  require(['@/components/article/ArticleDetailContent'], (component) => {
    resolve(component)
  })
}
Vue.use(VueAxios, axios)
Vue.use(VueShowdown, {
  options: {
    emoji: false
  }
})
var current
export default {
  name: 'ArticleDetail',
  template: '<ArticleDetail/>',
  components: {
    common_header_view: Header,
    article_detail_content_view: ArticleDetailContent
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      item: {},
      commentsItems: null
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      if (vm.$route.meta.returnback) {
        let _scrollTop = getItem(vm.$route.name)
        document.body.scrollTop = _scrollTop
      } else {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    })
  },
  beforeRouteLeave: function (to, from, next) {
    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setItem(this.$route.name, _scrollTop)
    from.meta.returnback = true
    next()
  },
  activated: function () {
    if (!this.$route.meta.returnback) {
      current.getArticleDetail()
      current.getNewComments()
    }
  },
  created: function () {
    current = this
    current.getArticleDetail()
    current.getNewComments()
  },
  mounted: function () {
    // current.onCompleted()
  },
  methods: {
    getArticleDetail: function () {
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      let _articleId = this.$route.params.articleId
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
          let ar = response.data.data
          if (checkNull(ar)) {
            window.location.href = '/common/404'
            return false
          }
          current.item = ar
          current.$nextTick(function () {
            current.pinch()
          })
          return true
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    getNewComments: function () {
      current.commentsItems = null
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      let _articleId = current.$route.params.articleId
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
          let cos = response.data.data
          if (checkNull(cos)) {
            return false
          }
          current.commentsItems = cos
          return true
        })
        .catch(error => {
          console.log(error)
        })
    },
    pinch: function () {
      $(function () {
        $('.ar_content').find('img').each(function (i) {
          let _this = $(this)
          _this.attr('width', '100%')
          let src = _this.attr('src')
          _this.bind('click', function () {
            let t = $('#bigImgdiv')
            let c = $('#bigimg').attr('src')
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
    //
    getAllComments: function () {
      let _articleId = this.$route.params.articleId
      this.$router.push({ path: '/article/' + _articleId + '/comments' })
    },
    //
    doComment: function () {
      let _token = ''
      let _userId = ''
      $(function () {
        let _userInfo = $.parseJSON(getItem('user'))
        if (!checkNull(_userInfo)) {
          _token = _userInfo.token
          _userId = _userInfo.userId
        }
      })
      let _text = $('textarea[name=co_tt]').val()
      if (checkNull(_text)) {
        this.$toast.bottom('评论不能为空')
        return false
      }
      if (_text.length > 100) {
        this.$toast.bottom('评论过长')
        return false
      }
      $('.co_btn').attr('disabled', 'disabled')
      let _articleId = this.$route.params.articleId

      Vue.axios({
        method: 'post',
        url: '/api/v1/article/' + _articleId + '/comment',
        headers: {
          token: _token,
          userId: _userId
        },
        data: {
          content: _text
        }
      }).then(response => {
        let obj = response.data
        if (obj.code === 20001) {
          this.$toast.bottom('请先登录')
          removeItem('user')
          $('.co_btn').removeAttr('disabled')
          return false
        }
        if (obj.code === 0) {
          this.$toast.bottom('评论成功')
          $('.co_tt').val('')
          if (current.commentsItems == null) {
            current.commentsItems = []
          }
          current.commentsItems.unshift(obj.data)
        } else if (obj.code === 20001) {
          this.$toast.bottom('请先登录')
          removeItem('user')
        }
        $('.co_btn').removeAttr('disabled')
        return true
      }).catch(error => {
        $('.co_btn').removeAttr('disabled')
        console.log(error)
      })
    },
    onCompleted: function () {
    }
  }
}
