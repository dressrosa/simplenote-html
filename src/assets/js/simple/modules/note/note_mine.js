import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull, unbindScroll } from '@/assets/js/simple/common'
import { getScrollTop, getClientHeight, getScrollHeight } from '@/assets/js/simple/page'
import { getItem, setItem } from '@/assets/js/simple/localstored'
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
var _lock = false
var _pageNum = 1
var _pageSize = 5
export default {
  name: 'NoteMine',
  template: '<NoteMine/>',
  components: {
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      items: null
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
    if (!this.$route.meta.returnback) {
      _pageNum = 1
      current.items = null
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
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        _userId = _userInfo.userId
      }
      Vue.axios({
        method: 'get',
        url: '/api/v1/note/listOfUser',
        headers: {
          pageNum: _pageNum,
          pageSize: _pageSize
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
          if (current.items == null) {
            current.items = _ret
          } else {
            _ret.forEach(v => {
              current.items.push(v)
            })
          }
        })
        .catch(error => {
          _lock = false
          console.log(error)
        })
    },
    //
    goBack: function () {
      // current.saveDraft()
      // window.history.length > 1
      //   ? this.$router.go(-1)
      //   : this.$router.push('/mine')
      this.$router.push('/mine')
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
    //
    onCompleted: function () {
    }
  }
}
