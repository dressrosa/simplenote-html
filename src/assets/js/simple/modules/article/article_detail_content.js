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
    current.onCompleted()
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
            current.$router.push({ path: '/common/404' })
            return false
          }
          let ar = response.data.data
          if (checkNull(ar)) {
            current.$router.push({ path: '/common/404' })
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
      // 图片是异步 所以需要重新刷新下才能使用放大
      current.$previewRefresh()
      current.highlight()
    },
    stopParentLoading: () => {
      current.$emit('func', false)
    },
    // 异步加载js
    parallelLoadScripts: (array, callback) => {
      var loader = function (src, handler) {
        let script = document.createElement('script')
        script.src = src
        script.onload = script.onreadystatechange = function () {
          script.onreadystatechange = script.onload = null
          handler()
        }
        let head = document.getElementsByTagName('head')[0]
        let doc = (head || document.body)
        doc.appendChild(script)
      };
      // eslint-disable-next-line
      (function run() {
        if (array.length !== 0) {
          loader(array.shift(), run)
        } else {
          callback && callback()
        }
      })()
    },
    highlight: () => {
      document.querySelectorAll('pre code').forEach((block) => {
        // eslint-disable-next-line
        hljs.highlightBlock(block)
      })
    },
    //
    onCompleted: () => {
      let scripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js'
      ]
      current.parallelLoadScripts(scripts, () => {
        current.highlight()
      })
    }
  }
}
