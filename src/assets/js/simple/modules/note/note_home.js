import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull, unbindScroll } from '@/assets/js/simple/common'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
import { getItem, setItem } from '@/assets/js/simple/localstored'
import Footer from '@/components/Footer'
import PullToRefresh from 'pulltorefreshjs'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
Vue.use(Toast, {
  type: 'bottom',
  duration: 1000,
  wordWrap: true,
  width: '130px'
})
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
var current
var _lock = false
var _pageNum = 1
var _pageSize = 20
export default {
  name: 'Notes',
  template: '<NoteHome/>',
  components: {
    common_footer_view: Footer
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: []
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      let _scrollTop = getItem(vm.$route.name)
      document.body.scrollTop = _scrollTop
      vm.bindScroll()
    })
  },
  beforeRouteLeave: function (to, from, next) {
    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setItem(this.$route.name, _scrollTop)
    to.meta.returnback = false
    unbindScroll()
    next()
  },
  activated: function () {
    console.log(1)
    if (!this.$route.meta.returnback) {
      _pageNum = 1
      current.items = []
      current.getNotes(1, _pageSize)
    }
  },
  created: function () {
    current = this
    // current.getNotes(1, _pageSize)
  },
  destroyed: function () {
    unbindScroll()
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getNotes: function (_pageNum, _pageSize) {
      _lock = true
      let _userId = ''
      let _token = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _userId = _userInfo.userId
        _token = _userInfo.token
      }
      Vue.axios({
        method: 'get',
        url: '/api/v1/note/squareList',
        headers: {
          pageNum: _pageNum,
          pageSize: _pageSize,
          'token': _token,
          'userId': _userId
        },
        params: {
          reqtime: new Date().valueOf(),
          userId: _userId
        }
      })
        .then(response => {
          _lock = false
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          if (response.data.code !== 0) {
            return false
          }
          if (checkNull(response.data.data)) {
            return false
          }
          let _ret = response.data.data
          _ret.forEach(v => {
            let n = 200 - (v.attr.likeNum / 200) * 0.995 - v.attr.likeNum % 200 * 0.005
            v.rgb = 'color: rgb(' + n + ', 150, 35)'
            current.items.push(v)
          })
          current.$nextTick(() => {
            current.preHandle(_ret)
          })
        })
        .catch(error => {
          _lock = false
          console.log(error)
        })
    },
    itemClick: function (event) {
      let _articleId = event.currentTarget.getAttribute('article-id')
      this.$router.push({ path: '/article/' + _articleId })
    },
    goComment: function (event) {
      let _articleId = event.currentTarget.getAttribute('article-id')
      this.$router.push({ path: '/article/' + _articleId + '/comments' })
    },
    showLike: function (event) {
      let _target = event.currentTarget
      let isLike = _target.getAttribute('data-like')
      let numEle = _target.nextElementSibling
      let a = parseInt(numEle.innerText)
      if (isLike === '1') {
        _target.setAttribute('data-like', '-1')
        numEle.innerText = a - 1
        numEle.style.color = ''
      } else {
        _target.setAttribute('data-like', '1')
        numEle.innerText = a + 1
        numEle.style.color = 'rgb(0, 150, 35)'
      }
      if (_lock) {
        return
      }
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        return
      }
      _lock = true
      let _userId = _userInfo.userId
      let _token = _userInfo.token
      let noteId = _target.getAttribute('note-id')
      Vue.axios({
        method: 'post',
        url: '/api/v1/note/like',
        headers: {
          'token': _token,
          'userId': _userId
        },
        data: {
          noteId: noteId
        }
      })
        .then(response => {
          _lock = false
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          if (response.data.code !== 0) {
            return false
          }
        })
        .catch(error => {
          _lock = false
          console.log(error)
        })
    },
    //
    bindScroll: function () {
      window.onload = () => {
        window.onscroll = () => {
          let loading = document.getElementsByClassName('loading')[0]
          if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            if (!_lock) {
              _lock = true
              loading.style.visibility = 'visible'
              setTimeout(() => {
                current.getNotes(++_pageNum, _pageSize)
                loading.style.visibility = 'hidden'
              }, 50)
            }
          }
        }
      }
    },
    refesh: function () {
      current.items = []
      _pageNum = 1
      current.getNotes(1, _pageSize)
    },
    preHandle: ars => {
      ars.forEach(v => {
        document.getElementsByName(v.noteId)
          .forEach(img => {
            img.setAttribute('preview', v.noteId)
            img.setAttribute('preview-text', 'img')
            img.setAttribute('width', '100%')
          })
      })
      // 图片是异步 所以需要重新刷新下才能使用放大
      current.$previewRefresh()
    },
    //
    onCompleted: function () {
      PullToRefresh.init({
        mainElement: 'body',
        iconRefreshing: '<i/>',
        instructionsPullToRefresh: '下拉刷新',
        instructionsReleaseToRefresh: '释放加载',
        instructionsRefreshing: '加载中...',
        onRefresh: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve()
              current.refesh(1, _pageSize)
            }, 1500)
          })
        }
      })
    }
  }
}
