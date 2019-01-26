import Vue from 'vue'
import router from '@/router'
// eslint-disable-next-line
import $ from 'jquery'
// eslint-disable-next-line
import jquerysession from '@/assets/js/simple/jquerysession'
import '@/assets/js/simple/note'
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
    goMine: function () {
      this.$router.push({ path: '/mine' })
    },
    goTransform: function (_flag) {
      switch (_flag) {
        case 1:
          this.$router.push({ path: '/' })
          break
        case 2:
          this.$router.push({ path: '/hello' })
          break
        case 3:
          this.$router.push({ path: '/mine' })
          break
      }
    },
    //
    longClickInit: function () {
      var _scroller = document.getElementById('footerNote')
      var _longClick = false
      var timeOutEvent = 0
      _scroller.addEventListener('touchstart', function (event) {
        _longClick = 0
        timeOutEvent = setTimeout(function () {
          _longClick = true
        }, 2000)
        return false
      }, false)
      _scroller.addEventListener('touchmove', function (event) {
        clearTimeout(timeOutEvent)
        timeOutEvent = 0
        event.preventDefault()
      }, false)
      _scroller.addEventListener('touchend', function (event) {
        clearTimeout(timeOutEvent)
        if (timeOutEvent !== 0 && _longClick) {
          timeOutEvent = 0
          _longClick = false
          // 此处为点击事件
          console.log('hello')
          current.$router.push({ 'path': '/note/left' })
        }
        return false
      }, false)
    },
    //
    doInitLocalStorage: function () {
      if (!window.localStorage) {
        Object.defineProperty(window, 'localStorage', new (function () {
          var aKeys = []
          var oStorage = {}
          Object.defineProperty(oStorage, 'getItem', {
            value: function (sKey) { return sKey ? this[sKey] : null },
            writable: false,
            configurable: false,
            enumerable: false
          })
          Object.defineProperty(oStorage, 'key', {
            value: function (nKeyId) { return aKeys[nKeyId] },
            writable: false,
            configurable: false,
            enumerable: false
          })
          Object.defineProperty(oStorage, 'setItem', {
            value: function (sKey, sValue) {
              if (!sKey) { return }
              document.cookie = escape(sKey) + '=' + escape(sValue) + ' path=/'
            },
            writable: false,
            configurable: false,
            enumerable: false
          })
          Object.defineProperty(oStorage, 'length', {
            get: function () { return aKeys.length },
            configurable: false,
            enumerable: false
          })
          Object.defineProperty(oStorage, 'removeItem', {
            value: function (sKey) {
              if (!sKey) { return }
              var sExpDate = new Date()
              sExpDate.setDate(sExpDate.getDate() - 1)
              document.cookie = escape(sKey) + '= expires=' + sExpDate.toGMTString() + ' path=/'
            },
            writable: false,
            configurable: false,
            enumerable: false
          })
          this.get = function () {
            var iThisIndx
            for (var sKey in oStorage) {
              iThisIndx = aKeys.indexOf(sKey)
              if (iThisIndx === -1) {
                oStorage.setItem(sKey, oStorage[sKey])
              } else { aKeys.splice(iThisIndx, 1) }
              delete oStorage[sKey]
            }
            for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]) }
            for (var iCouple, iKey, iCouplId = 0, aCouples = document.cookie.split(/\s*\s*/); iCouplId < aCouples.length; iCouplId++) {
              iCouple = aCouples[iCouplId].split(/\s*=\s*/)
              if (iCouple.length > 1) {
                oStorage[iKey = unescape(iCouple[0])] = unescape(iCouple[1])
                aKeys.push(iKey)
              }
            }
            return oStorage
          }
          this.configurable = false
          this.enumerable = true
        })())
      }
    },
    //
    onCompleted: function () {
      current.doInitLocalStorage()
      current.longClickInit()
    }
  }
}
