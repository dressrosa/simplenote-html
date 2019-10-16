import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import { getItem } from '@/assets/js/simple/localstored'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(Toast, {
  type: 'bottom',
  duration: 1000,
  wordWrap: true,
  width: '130px'
})
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
var current
var _lock = false
export default {
  name: 'ArticleEdit',
  template: '<ArticleEdit/>',
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      articleTitle: ''
    }
  },
  created: function () {
    current = this
    let _articleId = this.$route.params.articleId
    current.getArticle(_articleId)
    current.getArticleContent(_articleId)
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getArticle: _articleId => {
      _lock = true
      Vue.axios({
        method: 'get',
        url: '/api/v1/article/' + _articleId,
        headers: {
        },
        params: {
        }
      }).then(response => {
        _lock = false
        if (response.data.code !== 0) {
          return false
        }
        if (checkNull(response.data.data)) {
          return false
        }
        let item = response.data.data
        current.setTitle(item.title)
      }).catch(error => {
        _lock = false
        // catch 指请求出错的处理
        console.log(error)
      })
    },
    //
    getArticleContent: _articleId => {
      Vue.axios({
        method: 'get',
        url: '/api/v1/article/content/' + _articleId,
        headers: {
        },
        params: {
        }
      }).then(response => {
        if (response.data.code !== 0) {
          return false
        }
        if (checkNull(response.data.data)) {
          return false
        }
        let item = response.data.data
        current.setMdContent(item.content)
      }).catch(error => {
        // catch 指请求出错的处理
        console.log(error)
      })
    },
    getMdContent: () => {
      let mk = current.$refs.mymd
      return mk.d_value
    },
    setMdContent: content => {
      let mk = current.$refs.mymd
      mk.d_value = content
    },
    getTitle: () => {
      return document.getElementsByClassName('edit_title_input')[0].value
    },
    setTitle: title => {
      current.articleTitle = title
    },
    //
    publish: event => {
      if (_lock) {
        return false
      }
      let _content = current.getMdContent()
      let _title = current.getTitle()
      if (checkNull(_title)) {
        current.$toast.bottom('标题不能为空')
        return false
      }
      if (checkNull(_content)) {
        current.$toast.bottom('内容不能为空')
        return false
      }
      _lock = true
      current.doRefreshButton()
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      let _articleId = current.$route.params.articleId
      Vue.axios({
        method: 'post',
        url: '/api/v1/article/edit',
        headers: {
          'token': _token,
          'userId': _userId
        },
        data: {
          'title': _title,
          'content': _content,
          'userId': _userId,
          'articleId': _articleId
        }
      }).then(response => {
        _lock = false
        current.doRecoverButton()
        if (response.data.code !== 0) {
          current.$toast.bottom(response.data.message)
          return false
        }
        if (checkNull(response.data.data)) {
          current.$toast.bottom('修改失败')
          return false
        }
        current.$toast.bottom('修改成功')
        current.$router.push({ path: '/article/' + _articleId })
      }).catch(error => {
        _lock = false
        current.doRecoverButton()
        // catch 指请求出错的处理
        console.log(error)
      })
    },
    //
    doRefreshButton: () => {
      let _target = document.getElementById('publish')
      _target.innerHTML = '完成'
      _target.className = 'header_w'
    },
    //
    doRecoverButton: () => {
      let _target = document.getElementById('publish')
      _target.innerHTML = ''
      _target.className = 'header_w fa fa-spinner fa-spin'
    },
    //
    goBack: () => {
      window.history.length > 1
        ? current.$router.go(-1)
        : current.$router.push('/')
    },
    //
    onCompleted: () => {
    }
  }
}
