import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
const ArticleDetailContent = resolve => require(['@/components/article/ArticleDetailContent'], resolve)
Vue.use(VueAxios, axios)
var current
export default {
  name: 'ArticleDetail',
  template: '<ArticleDetail/>',
  components: {
    common_header_view: Header,
    common_footer_view: Footer,
    article_detail_content_view: ArticleDetailContent
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      item: {},
      loading: true,
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
    current.onCompleted()
  },
  methods: {
    getArticleDetail: () => {
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      let _articleId = current.$route.params.articleId
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
    //
    getAllComments: () => {
      let _articleId = current.$route.params.articleId
      current.$router.push({ path: '/article/' + _articleId + '/comments' })
    },
    //
    doComment: () => {
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }

      // let _text = $('textarea[name=co_tt]').val()
      let _text = document.getElementsByName('co_tt')[0].value
      if (checkNull(_text)) {
        current.$toast.bottom('评论不能为空')
        return false
      }
      if (_text.length > 100) {
        current.$toast.bottom('评论过长')
        return false
      }
      let cobtn = document.getElementsByClassName('co_btn')[0]
      cobtn.setAttribute('disabled', 'disabled')
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
          current.$toast.bottom('请先登录')
          removeItem('user')
          cobtn.removeAttribute('disabled')
          return false
        }
        if (obj.code === 0) {
          current.$toast.bottom('评论成功')
          cobtn.value = ''
          if (current.commentsItems == null) {
            current.commentsItems = []
          }
          current.commentsItems.unshift(obj.data)
        } else if (obj.code === 20001) {
          current.$toast.bottom('请先登录')
          removeItem('user')
        }
        cobtn.removeAttribute('disabled')
        return true
      }).catch(error => {
        cobtn.removeAttribute('disabled')
        console.log(error)
      })
    },
    stopLoading: () => {
      current.loading = false
    },
    onCompleted: function () {
    }
  }
}
