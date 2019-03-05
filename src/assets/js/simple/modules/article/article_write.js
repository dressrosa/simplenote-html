import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import VueAxios from 'vue-axios'
// eslint-disable-next-line
import $ from 'jquery'
import scriptjs from 'scriptjs'
import { defaultConfig } from '@/assets/js/simple/editorConfig'
import { checkNull } from '@/assets/js/simple/common'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
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
      items: null,
      articleTitle: null,
      editor: null,
      timer: null,
      jsLoadOver: false
    }
  },
  props: {
    editorId: {
      type: String,
      default: 'markdown-editor'
    },
    onchange: {
      // 内容改变时回调，返回（html, markdown, text）
      type: Function
    },
    config: {
      // 编辑器配置
      type: Object
    },
    initData: {
      type: String
    },
    initDataDelay: {
      type: Number, // 延迟初始化数据时间，单位毫秒
      default: 0
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
    })
  },
  beforeRouteLeave: function (to, from, next) {
    current.saveDraft()
    next()
  },
  created: function () {
    current = this
    current.init()
  },
  deactivated: function () {
  },
  activated: function () {
  },
  beforeDestroy: function () {
    current.saveDraft()
  },
  destroyed: function () {
    if (current.timer != null) {
      window.clearInterval(current.timer)
      current.timer = null
    }
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    //
    saveDraft: function () {
      let _draftTitle = current.getTitle()
      if (!checkNull(_draftTitle)) {
        setItem('draftTitle', _draftTitle, true)
        setItem('draftContent', current.getMarkdown(), true)
      }
    },
    fetchScript: function (url) {
      return new Promise(resolve => {
        scriptjs(url, () => {
          resolve()
        })
      })
    },
    getConfig: function () {
      return { ...defaultConfig, ...current.config }
    },
    getEditor: function () {
      return current.editor
    },
    watch: function () {
      return current.editor.watch()
    },
    unwatch: function () {
      return current.editor.unwatch()
    },
    previewing: function () {
      return current.editor.previewing()
    },
    getHTML: function () {
      return current.editor.getHTML()
    },
    getTitle: function () {
      return document.getElementsByClassName('edit_title_input')[0].value
    },
    getMarkdown: function () {
      return current.editor.getMarkdown()
    },
    setMarkdown: function (markdown) {
      return current.editor.setMarkdown(markdown)
    },
    toolbarIcons: function () {
      // ['undo', 'redo', '|', 'bold', 'del', 'italic', 'quote', 'ucwords', 'uppercase', 'lowercase', '|', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '|', 'list-ul', 'list-ol', 'hr', '|', 'link', 'reference-link', 'image', 'code', 'preformatted-text', 'code-block', 'table', 'datetime', 'emoji', 'html-entities', 'pagebreak', '|', 'goto-line', 'watch', 'preview', 'fullscreen', 'clear', 'search', '|', 'help', 'info']
      return ['bold', 'del', 'italic', 'quote', 'ucwords', 'uppercase', 'lowercase', '|',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '|',
        'hr', 'code', 'table', 'goto-line', '|',
        'undo', 'redo', 'clear', 'watch', 'preview'
      ]
    },
    init: function () {
      let _title = getItem('draftTitle')
      let _content = getItem('draftContent')
      if (!checkNull(_title)) {
        current.articleTitle = _title
        current.initEditor(_content)
      } else {
        current.initEditor('')
      }
    },
    initEditor: function (markdown) {
      let config = current.getConfig()
      config.toolbarIcons = current.toolbarIcons()
      if (markdown) {
        config.markdown = markdown
      }
      (async () => {
        await current.fetchScript('/static/editor.md/jquery-1.12.2.min.js')
        await current.fetchScript('/static/editor.md/lib/codemirror/codemirror.min.js')
        await current.fetchScript('/static/editor.md/lib/marked.min.js')
        await current.fetchScript('/static/editor.md/editormd.min.js')
        current.jsLoadOver = true
        current.$nextTick(() => {
          current.editor = window.editormd(current.editorId, config)
          current.editor.on('load', () => {
            setTimeout(() => {
              // hack bug: 一个页面多个编辑器只能初始化其中一个数据问题
              current.initData && current.editor.setMarkdown(current.initData)
            }, current.initDataDelay)
          })
          current.onchange &&
            current.editor.on('change', () => {
              let html = current.editor.getPreviewedHTML()
              current.onchange({
                markdown: current.editor.getMarkdown(),
                html: html,
                text: window.$(html).text()
              })
            })
        })
      })()
    },
    //
    publish: function () {
      if (lock) {
        return false
      }
      let _content = current.getMarkdown()
      let _title = document.getElementsByClassName('.edit_title_input').value
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
        let _articleId = response.data.data
        current.doClearDraft()
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
    }
  }
}
