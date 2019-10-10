import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import VueAxios from 'vue-axios'
// eslint-disable-next-line
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
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
var lock = false
export default {
  name: 'ArticleWrite',
  template: '<ArticleWrite/>',
  router,
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      articleTitle: null,
      markdown_content: ''
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
    })
  },
  beforeRouteLeave: function (to, from, next) {
    // current.saveDraft()
    next()
  },
  created: function () {
    current = this
  },
  deactivated: function () {
  },
  activated: function () {
  },
  // beforeDestroy: function () {
  //   current.saveDraft()
  // },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    //
    saveDraft: function () {
      let _draftTitle = current.getTitle()
      if (!checkNull(_draftTitle)) {
        let _draftContent = current.getMdContent()
        setItem('draftTitle', _draftTitle, true)
        setItem('draftContent', _draftContent, true)
      }
    },
    init: function () {
      let _title = getItem('draftTitle')
      let _content = getItem('draftContent')
      if (!checkNull(_title)) {
        current.setTitle(_title)
        current.setMdContent(_content)
      } else {
        current.setMdContent('')
      }
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
    publish: function () {
      if (lock) {
        return false
      }
      let _content = current.getMdContent()
      let _title = current.getTitle()
      if (checkNull(_title)) {
        this.$toast.bottom('标题不能为空')
        return false
      }
      if (checkNull(_content)) {
        this.$toast.bottom('内容不能为空')
        return false
      }
      current.doRefreshButton()
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      lock = true
      Vue.axios({
        method: 'post',
        url: '/api/v1/article/add',
        headers: {
          'token': _token,
          'userId': _userId
        },
        data: {
          'title': _title,
          'content': _content
        }
      }).then(function (response) {
        lock = false
        current.doRecoverButton()
        if (checkNull(response.data)) {
          current.$toast.bottom('网络打哈欠,等下再试吧')
          return false
        }
        if (response.data.code !== 0) {
          current.$toast.bottom(response.data.message)
          return false
        }
        if (checkNull(response.data.data)) {
          return false
        }
        current.$toast.bottom('发表成功')
        current.doClearDraft()
        let _articleId = response.data.data
        current.$router.push({ path: '/article/' + _articleId })
      }).catch(error => {
        console.log(error)
        lock = false
        current.doRecoverButton()
      })
    },
    //
    doRefreshButton: function () {
      let _target = document.getElementById('publish')
      _target.innerHTML = '完成'
      _target.className = 'header_w'
    },
    //
    doRecoverButton: function () {
      let _target = document.getElementById('publish')
      _target.innerHTML = ''
      _target.className = 'header_w fa fa-spinner fa-spin'
    },
    //
    doClearDraft: function () {
      removeItem('draftTitle')
      removeItem('draftContent')
    },
    //
    goBack: function () {
      current.saveDraft()
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    //
    onCompleted: function () {
      current.init()
    }
  }
}
