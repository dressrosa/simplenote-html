import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull, unbindScroll } from '@/assets/js/simple/common'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
// eslint-disable-next-line
import { getItem, setItem, removeItem } from '@/assets/js/simple/localstored'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import Footer from '@/components/Footer'
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
  name: 'Home',
  template: '<Home/>',
  components: {
    common_footer_view: Footer
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null,
      isLogin: false
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      vm.bindScroll()
      let _scrollTop = getItem(vm.$route.name)
      if (!checkNull(_scrollTop)) {
        document.body.scrollTop = _scrollTop
        document.documentElement.scrollTop = _scrollTop
      }
    })
  },
  beforeRouteLeave: function (to, from, next) {
    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setItem(current.$route.name, _scrollTop)
    to.meta.returnback = false
    unbindScroll()
    next()
  },
  created: function () {
    current = this
    current.getHotList(1, _pageSize)
  },
  destroyed: function () {
    unbindScroll()
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    getHotList: (_pageNum, _pageSize) => {
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        current.isLogin = true
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      Vue.axios.get('/api/v1/home', {
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
          let _ret = response.data.data
          if (current.items == null) {
            current.items = _ret
          } else {
            _ret.forEach(v => {
              current.items.push(v)
            })
          }
          //  current.$forceUpdate()
          _lock = false
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    itemClick: event => {
      let _articleId = event.currentTarget.id
      current.$router.push({ path: '/article/' + _articleId })
    },
    avatarClick: event => {
      let _userId = event.currentTarget.id
      window.location.href = '/user/' + _userId
    },
    heartClick: event => {
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        removeItem('user')
        return false
      }
      let _cur = event.currentTarget
      let _articleId = _cur.getAttribute('article-id')
      let $next = _cur.nextElementSibling
      let num = $next.innerHTML
      let _isCollect
      if (_cur.getAttribute('data-heart') === '0') {
        _cur.setAttribute('data-heart', '1')
        _cur.style.color = '#fd4d4d'
        $next.innerHTML = num - (-1)
        _isCollect = 0
      } else if (_cur.getAttribute('data-heart') === '1') {
        _cur.style.color = '#a7a7a7'
        _cur.setAttribute('data-heart', '0')
        $next.innerHTML = num - 1
        _isCollect = 1
      }
      let _token = ''
      let _userId = ''
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      Vue.axios({
        method: 'post',
        url: '/api/v1/article/collect',
        headers: {
          token: _token,
          userId: _userId
        },
        data: {
          articleId: _articleId,
          isCollect: _isCollect
        }
      }).then(response => {
        let obj = response.data
        if (obj.code === '20001') {
          current.$toast.bottom('请先登录')
          removeItem('user')
          return false
        }
        return true
      }).catch(error => {
        console.log(error)
      })
    },
    commentClick: event => {
      let _articleId = event.currentTarget.getAttribute('article-id')
      current.$router.push({ path: '/article/' + _articleId + '/comments' })
    },
    likeClick: event => {
      let _cur = event.currentTarget
      let _articleId = _cur.getAttribute('article-id')
      let $next = _cur.nextElementSibling
      let num = $next.innerHTML
      let _isLike
      let dl = _cur.getAttribute('data-like')
      if (dl === '0') {
        _cur.style.color = '#fd4d4d'
        _cur.setAttribute('data-like', '1')
        $next.innerHTML = (num - (-1))
        _isLike = 0
      } else if (dl === '1') {
        _cur.style.color = '#a7a7a7'
        _cur.setAttribute('data-like', '0')
        $next.innerHTML = (num - 1)
        _isLike = 1
      }
      let _token = ''
      let _userId = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _token = _userInfo.token
        _userId = _userInfo.userId
      }
      Vue.axios.post('/api/v1/article/like', {
        headers: {
          token: _token,
          userId: _userId
        },
        params: {
          articleId: _articleId,
          isLike: _isLike
        }
      }).then(response => {
        let obj = response.data
        if (obj.code === '20001') {
          console.log('未登录')
          removeItem('user')
        }
        return true
      }).catch(error => {
        console.log(error)
      })
    },
    toTransparentHeader: () => {
      let n1 = document.getElementById('top_n1_info')
      if (n1.style.opacity !== 1) {
        n1.style.opacity = 1
        let ha = document.getElementsByClassName('common_header')[0]
        ha.style.boxShadow = '0px 0px 0px'
        ha.style.background = 'rgba(255, 255, 255, 0)'
      }
    },
    toCommonHeader: op => {
      let n1 = document.getElementById('top_n1_info')
      if (n1.style.opacity === '1') {
        let ha = document.getElementsByClassName('common_header')[0]
        n1.style.opacity = op
        ha.style.boxShadow = '0px 0px 5px #a7a7a7'
        ha.style.background = '#CF4647'
      }
    },
    //
    bindScroll: () => {
      window.onload = () => {
        window.onscroll = () => {
          // let _top = document.documentElement.scrollTop
          // if (_top > 300) {
          //   current.toTransparentHeader()
          // } else {
          //   current.toCommonHeader(1 - _top / 300.0)
          // }
          let loading = document.getElementsByClassName('loading')[0]
          if (getScrollTop() + getClientHeight() === getScrollHeight()) {
            if (!_lock) {
              _lock = true
              loading.style.visibility = 'visible'
              setTimeout(() => {
                current.getHotList(++_pageNum, _pageSize)
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
