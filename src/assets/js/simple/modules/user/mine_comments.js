import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import { checkNull, unbindScroll } from '@/assets/js/simple/common'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
import { getItem, setItem } from '@/assets/js/simple/localstored'
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
var _lock = false
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
      let _scrollTop = getItem(vm.$route.name)
      document.body.scrollTop = _scrollTop
      vm.bindScroll()
    })
  },
  beforeRouteLeave: function (to, from, next) {
    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setItem(this.$route.name, _scrollTop)
    unbindScroll()
    next()
  },
  created: function () {
    current = this
    current.getComments(1, _pageSize)
  },
  destroyed: function () {
    unbindScroll()
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getComments: function (_pageNum, _pageSize) {
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        current.user = _userInfo
        current.isLogin = true
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      _lock = true
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
          _lock = false
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          if (response.data.code !== 0) {
            return false
          }
          if (checkNull(response.data.data)) {
            return false
          }
          let _ret = response.data.data
          if (current.items == null) {
            current.items = _ret
          } else {
            _ret.forEach(v => {
              current.items.push(v)
            })
          }
          current.$nextTick(function () {
            let cell = document.getElementsByClassName('mint-cell-value')
            for (let i = 0; i < cell.length; i++) {
              cell[i].style.width = '100%'
            }
          })
          //  current.$forceUpdate()
        })
        .catch(error => {
          _lock = false
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
          // $('#' + commentId).css({
          //   'opacity': '0',
          //   '-webkit-transition': 'opacity 2s',
          //   'transition': 'opacity 2s'
          // })
          $('#' + commentId).fadeOut(500, () => {
            $(this).css({ 'display': 'none' })
          })
          current.$toast.bottom('删除成功')
        }
      }).catch(err => {
        if (err === 'cancel') {
        }
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
                current.getComments(++_pageNum, _pageSize)
                loading.style.visibility = 'hidden'
              }, 50)
            }
          }
        }
      }
    },
    //
    onCompleted: function () {
    }
  }
}
