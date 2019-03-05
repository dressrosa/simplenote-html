import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import Header from '@/components/Header'
Vue.use(Toast, {
  type: 'bottom',
  duration: 1000,
  wordWrap: true,
  width: '130px'
})
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
var current
var _lock = true
var _pageNum = 1
var _pageSize = 30
export default {
  name: 'ArticleComments',
  template: '<ArticleComments/>',
  components: {
    common_header_view: Header
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null,
      count: 0
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      if (vm.$route.meta.returnback) {
        let _scrollTop = getItem(vm.$route.name)
        document.body.scrollTop = _scrollTop
      } else {
        document.body.scrollTop = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      }
    })
  },
  beforeRouteLeave: function (to, from, next) {
    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setItem(this.$route.name, _scrollTop)
    to.meta.returnback = false
    next()
  },
  activated: function () {
    if (!this.$route.meta.returnback) {
      _pageNum = 1
      current.items = null
      current.getComments(1, _pageSize)
    }
  },
  created: function () {
    current = this
    // current.getComments(1, _pageSize)
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    //
    getComments: function (_pageNum, _pageSize) {
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      let _articleId = this.$route.params.articleId
      Vue.axios.get('/api/v1/article/' + _articleId + '/comments', {
        headers: {
          pageNum: _pageNum,
          pageSize: _pageSize,
          token: _token,
          userId: _userId
        },
        params: {
        }
      })
        .then(response => {
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          if (response.data.code !== 0) {
            return false
          }
          let _ret = response.data.data
          if (checkNull(_ret)) {
            return false
          }
          if (current.items == null) {
            current.items = []
          }
          current.count = response.data.count
          _ret.forEach(v => {
            current.items.unshift(v)
          })
          _lock = false
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    //
    avatarClick: function (event) {
      let _userId = event.currentTarget.id
      window.location.href = '/user/' + _userId
    },
    //
    doComment: function () {
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
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
          current.count = current.count + 1
          if (current.items == null) {
            current.items = []
          }
          current.items.push(obj.data)
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
    //
    doLoad: function () {
      let _top = document.documentElement.scrollTop
      console.log('top:' + _top)
      if (_top === 0) {
        if (!_lock) {
          _lock = true
          $('.loading').css('display', 'block')
          setTimeout(function () {
            current.getComments(++_pageNum, _pageSize)
            console.log('pageNum:' + _pageNum)
            $('.loading').css('display', 'none')
          }, 50)
        }
      }
    },
    //
    onCompleted: function () {
      let outerScroller = document.querySelector('body')
      let touchStart = 0
      let touchDis = 0
      outerScroller.addEventListener('touchstart', function (event) {
        let touch = event.targetTouches[0]
        // 把元素放在手指所在的位置
        touchStart = touch.pageY
        //  console.log('开始:' + touchStart)
      }, false)
      outerScroller.addEventListener('touchmove', function (event) {
        let touch = event.targetTouches[0]
        // console.log('结束' + touch.pageY)
        touchDis = touch.pageY - touchStart
      }, false)
      outerScroller.addEventListener('touchend', function (event) {
        touchStart = 0
        let _top = document.documentElement.scrollTop
        // console.log('滑动距离' + touchDis)
        if (touchDis > 70 && _top === 0) {
          //   console.log('刷新了啊')
          current.doLoad()
        }
      }, false)
    }
  }
}
