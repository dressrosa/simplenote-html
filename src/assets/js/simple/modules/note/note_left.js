import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
import { getItem } from '@/assets/js/simple/localstored'
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
export default {
  name: 'NoteLeft',
  template: '<NoteLeft/>',
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
  beforeRouteLeave: function (to, from, next) {
    to.meta.returnback = false
    next()
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
    leftNote: function () {
      if (_lock) {
        return
      }
      let _userId = ''
      let _token = ''
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.bottom('请先登录')
        return false
      }
      _token = _userInfo.token
      _userId = _userInfo.userId
      let content = document.getElementById('noteContent').value
      if (checkNull(content)) {
        current.$toast.bottom('总得有点内容')
        return false
      }
      _lock = true
      current.changePlaneColor(true)
      let imgs = []
      let photoItems = document.getElementsByClassName('photo_item')
      for (let i = 0; i < photoItems.length; i++) {
        let url = photoItems[i].style.backgroundImage
        if (url !== '') {
          url = url.substring(5, url.length - 2)
          imgs.push(url)
        }
      }
      Vue.axios({
        method: 'post',
        url: '/api/v1/note/left',
        headers: {
          'token': _token,
          'userId': _userId
        },
        data: {
          userId: _userId,
          content: content,
          files: imgs
        }
      })
        .then(response => {
          _lock = false
          current.changePlaneColor(false)
          let code = response.data.code
          if (code === 20001) {
            current.$toast.bottom('请先登录')
            return false
          } else if (code !== 0) {
            current.$toast.bottom('发表失败')
            return false
          }
          current.goBack()
          return true
        })
        .catch(error => {
          _lock = false
          current.changePlaneColor(false)
          current.$toast.bottom('网络太差了')
          console.log(error)
        })
    },
    //
    changePlaneColor: function (flag) {
      let c = ''
      if (flag) {
        c = '#6d6d6d'
      }
      document.getElementById('publish').style.color = c
    },
    //
    goBack: function () {
      // current.saveDraft()
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/notes')
    },
    preview: function (event) {
      console.log(1)
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
        if (size > 1024 * 512) {
          let mul = (1024 * 512) / size
          var img = new Image()
          img.src = e.target.result
          img.onload = () => {
            src = current.compress(img, mul)
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
          bigImg.setAttribute('src', src)
          bigImg.onclick = function (e) {
            bigImgdiv.classList.remove('mark', 'fade-in')
            bigImgdiv.classList.add('fade-out', 'unmark')
          }
        }
      }
      if (f != null) {
        fr.readAsDataURL(f)
        if (photoItemId === 'item1') {
          document.getElementById('item2').style.display = ''
        } else if (photoItemId === 'item2') {
          document.getElementById('item3').style.display = ''
        } else if (photoItemId === 'item3') {
        }
      }
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

      if (itemId === 'item1') {
        let _file1 = box.getElementsByClassName('file1')[0]
        box.getElementsByClassName('fa')[0].style.display = 'block'
        _file1.style.display = 'block'
        box.style.display = ''
      } else if (itemId === 'item2') {
        let _file2 = box.getElementsByClassName('file2')[0]
        box.getElementsByClassName('fa')[0].style.display = 'block'
        _file2.style.display = 'block'
        box.style.display = ''
      } else if (itemId === 'item3') {
        let _file3 = box.getElementsByClassName('file3')[0]
        box.getElementsByClassName('fa')[0].style.display = 'block'
        _file3.style.display = 'block'
        box.style.display = ''
      }
    },
    //
    compress: function (img, mul) {
      // 默认按比例压缩
      let w = img.width * mul
      let h = img.height * mul
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
    onCompleted: function () {
      // 光标定位到输入框
      document.getElementById('noteContent').focus()
    }
  }
}
