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
Vue.use(VueAxios, axios)
Vue.use(VueShowdown, {
  options: {
    emoji: false
  }
})
var current
export default {
  name: 'ArticleDetailContent',
  template: '<ArticleDetailContent/>',
  components: {
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      item: null,
      loading: true
    }
  },
  activated: function () {
    if (!this.$route.meta.returnback) {
      current.getArticleContent()
    }
  },
  created: function () {
    current = this
    current.getArticleContent()
  },
  mounted: function () {
    // current.onCompleted()
  },
  methods: {
    getArticleContent: function () {
      current.loading = true
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      let _articleId = this.$route.params.articleId
      Vue.axios.get('/api/v1/article/content/' + _articleId, {
        headers: {
          token: _token,
          userId: _userId
        },
        params: {
        }
      })
        .then(response => {
          current.loading = false
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
    onCompleted: function () {
    }
  }
}
