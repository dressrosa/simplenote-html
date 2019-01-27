import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull } from '@/assets/js/simple/common'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
// eslint-disable-next-line
import jquerysession from '@/assets/js/simple/jquerysession'
import Header from '@/components/Header'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import { CellSwipe, MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(CellSwipe.name, CellSwipe)
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
var _pageSize = 10
export default {
  name: 'MineComments',
  template: '<MineComments/>',
  components: {
    common_header_view: Header
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null,
      isLogin: false,
      user: null
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      var _scrollTop = $.session.get(vm.$router.name)
      document.body.scrollTop = _scrollTop
    })
  },
  beforeRouteLeave: function (to, from, next) {
    var _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    $.session.set(this.$route.name, _scrollTop, true)
    next()
  },
  created: function () {
    current = this
    current.getComments(1, _pageSize)
  },
  destroyed: function () {
    $(window).unbind('scroll')
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getComments: function (_pageNum, _pageSize) {
      var _token = ''
      var _userId = ''
      var _userInfo = $.parseJSON($.session.get('user'))
      if (!checkNull(_userInfo)) {
        current.user = _userInfo
        current.isLogin = true
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      Vue.axios({
        method: 'get',
        url: '/api/v1/user/comments',
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
          if (checkNull(response.data.data)) {
            return false
          }
          var _ret = response.data.data
          if (current.items == null) {
            current.items = _ret
          } else {
            _ret.forEach(v => {
              current.items.push(v)
            })
          }
          current.$nextTick(function () {
            $('.mint-cell-value').each(function () {
              $(this).css({
                'width': '100%'
              })
            })
          })
          //  current.$forceUpdate()
          _lock = false
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    //
    doConfirmCallback: function (commentId) {
      MessageBox.confirm('', {
        message: '确认删除?',
        title: '提示',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          console.log(1)
          // $('#' + commentId).css({
          //   'opacity': '0',
          //   '-webkit-transition': 'opacity 2s',
          //   'transition': 'opacity 2s'
          // })
          $('#' + commentId).fadeOut(500, () => {
            $(this).css({ 'display': 'none' })
          })
          this.$toast.bottom('删除成功')
        }
      }).catch(err => {
        if (err === 'cancel') {
        }
      })
    },
    //
    onCompleted: function () {
      $(function () {
        $(window).scroll(function () {
          if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            if (!_lock) {
              _lock = true
              $('.loading').css('visibility', 'visible')
              setTimeout(function () {
                current.getComments(++_pageNum, _pageSize)
                $('.loading').css('visibility', 'hidden')
              }, 50)
            }
          }
        })
      })
    }
  }
}
