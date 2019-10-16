import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import VueShowdown from 'vue-showdown'
// import hljs from 'highlight.js'
import { getItem } from '@/assets/js/simple/localstored'
import 'highlight.js/styles/github.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
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
    getArticleContent: () => {
      current.loading = true
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      let _articleId = current.$route.params.articleId
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
          current.stopParentLoading()
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
          current.$nextTick(() => {
            current.preHandle()
          })
          return true
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    preHandle: () => {
      document.querySelectorAll('.ar_content img').forEach((img) => {
        img.setAttribute('preview', 1)
        img.setAttribute('preview-text', 'img')
        img.setAttribute('width', '100%')
      })
      document.querySelectorAll('pre code').forEach((block) => {
        // hljs.highlightBlock(block)
      })
      // 图片是异步 所以需要重新刷新下才能使用放大
      current.$previewRefresh()
    },
    stopParentLoading: () => {
      current.$emit('func', false)
    },
    //
    onCompleted: () => {
    }
  }
}
