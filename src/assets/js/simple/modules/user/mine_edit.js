import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import { getItem } from '@/assets/js/simple/localstored'
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
export default {
  name: 'MineEdit',
  template: '<MineEdit/>',
  components: {
    common_header_view: Header
  },
  // eslint-disable-next-line
  data() {
    return {
      // eslint-disable-next-line
      headForImg: imgHead,
      item: null
    }
  },
  created: function () {
    current = this
    let _userInfo = JSON.parse(getItem('user'))
    if (checkNull(_userInfo)) {
      current.$toast.bottom('请先登录')
      return
    }
    current.item = _userInfo
  },
  destroyed: function () {
  },
  mounted: function () {
    current.onCompleted()
  },
  methods: {
    goEditAvatar: () => {
      current.$router.push({ path: '/mine/avatar/edit' })
    },
    goEdit: function (_p) {
      this.$router.push({ path: '/mine/modify/' + _p })
    },
    //
    preview: function (event) {
      if (!window.FileReader) { // html5方案
        current.$toast.bottom('您的设备暂不支持上传图片')
        return false
      }
      let _file = event.currentTarget
      let photoItemId = _file.getAttribute('parent_id')

      let box = document.getElementById(photoItemId)
      let f = _file.files[0]

      let fr = new FileReader()
      fr.onload = function (e) {
        let size = f.size
        let src = e.target.result
        box.style.backgroundImage = 'url(' + src + ')'
        if (size > 1024 * 200) {
          let mul = (1024 * 200) / size
          var img = new Image()
          img.src = e.target.result
          img.onload = () => {
            src = current.compress(img, mul, true)
            box.style.backgroundImage = 'url(' + src + ')'
          }
        }
        _file.style.display = 'none'
        box.getElementsByClassName('fa')[0].style.display = 'none'
        box.onclick = function (e) {
          let target = e.currentTarget
          let bigImgdiv = document.getElementById('bigImgdiv')
          bigImgdiv.setAttribute('item_id', target.id)
          bigImgdiv.classList.remove('fade-out', 'unmark')
          bigImgdiv.classList.add('mark', 'fade-in')
          let bigImg = document.getElementById('bigImg')
          let bg = target.style.backgroundImage
          bigImg.setAttribute('src', bg.substring(5, bg.length - 2))
          bigImg.onclick = function (e) {
            bigImgdiv.classList.remove('mark', 'fade-in')
            bigImgdiv.classList.add('fade-out', 'unmark')
          }
        }
      }
      if (f != null) {
        fr.readAsDataURL(f)
      }
    },
    //
    compress: function (img, mul, isAvatar) {
      // 默认按比例压缩
      let w = img.width * mul
      let h = img.height * mul
      if (isAvatar) {
        w = (w > h) ? h : w
        h = 460
        w = 460
      }
      let quality = mul
      // 生成canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 创建属性节点
      let anw = document.createAttribute('width')
      anw.nodeValue = w
      let anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(img, 0, 0, w, h)
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality)
      canvas = null
      ctx = null
      return base64
    },
    //
    removeFile: function () {
      let bigImgdiv = document.getElementById('bigImgdiv')
      bigImgdiv.classList.add('fade-out', 'unmark')
      bigImgdiv.classList.remove('mark', 'fade-in')
      let itemId = bigImgdiv.getAttribute('item_id')
      let box = document.getElementById(itemId)
      box.style.backgroundImage = ''
      box.onclick = null
      let bigImg = document.getElementById('bigImg')
      bigImg.onclick = null

      let _file1 = box.getElementsByClassName('file1')[0]
      box.getElementsByClassName('fa')[0].style.display = 'block'
      _file1.style.display = 'block'
      box.style.display = ''
    },
    //
    onCompleted: function () {
    }
  }
}
