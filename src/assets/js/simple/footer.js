import Vue from 'vue'
import router from '@/router'
Vue.config.productionTip = false
var current
export default {
  name: 'CommonFooter',
  template: '<CommonFooter/>',
  router,
  // eslint-disable-next-line
  data() {
    return {
    }
  },
  beforeCreated: function () {
  },
  created: function () {
    current = this
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    //
    goTransform: function (_flag) {
      switch (_flag) {
        case 1:
          current.$router.push({ path: '/' })
          break
        case 2:
          current.$router.push({ path: '/notes' })
          break
        case 3:
          current.$router.push({ path: '/mine' })
          break
      }
    },
    //
    longClickInit: function () {
      let _scroller = document.getElementById('footerNote')
      let timer = null
      _scroller.addEventListener('touchstart', function (e) {
        console.log('touchstart')
        timer = setTimeout(function () {
          e.preventDefault()
          current.$router.push({ path: '/note/left' })
        }, 800)
      })
      _scroller.addEventListener('touchmove', function (e) {
        console.log('touchmove')
        clearTimeout(timer)
        timer = 0
      })
      _scroller.addEventListener('touchend', function (e) {
        console.log('touchend')
        clearTimeout(timer)
        // if (timer != 0) {
        //    alert('这是点击，不是长按');
        // }
        return false
      })
    },
    //
    // longClickInit: function () {
    //   let _scroller = document.getElementById('footerNote')
    //   let _longClick = false
    //   let timeOutEvent = 0
    //   _scroller.addEventListener('touchstart', function (event) {
    //     _longClick = 0
    //     timeOutEvent = setTimeout(function () {
    //       _longClick = true
    //     }, 2000)
    //     return false
    //   }, false)
    //   _scroller.addEventListener('touchmove', function (event) {
    //     clearTimeout(timeOutEvent)
    //     timeOutEvent = 0
    //     event.preventDefault()
    //   }, false)
    //   _scroller.addEventListener('touchend', function (event) {
    //     clearTimeout(timeOutEvent)
    //     if (timeOutEvent !== 0 && _longClick) {
    //       timeOutEvent = 0
    //       _longClick = false
    //       // 此处为点击事件
    //       console.log('hello')
    //       current.$router.push({ 'path': '/note/left' })
    //     }
    //     return false
    //   }, false)
    // },
    //
    onCompleted: function () {
      current.longClickInit()
    }
  }
}
