import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkNull } from '@/assets/js/simple/common'
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
export default {
  name: 'EditAvatar',
  template: '<EditAvatar/>',
  components: {
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
    console.log(1)
    current.onCompleted()
  },
  methods: {
    edit: function () {
      if (_lock) {
        return
      }
      let _userInfo = JSON.parse(getItem('user'))
      if (checkNull(_userInfo)) {
        current.$toast.top('请先登录')
        return false
      }
      // 头像
      let avatar = document.getElementById('avatarupload_preview')
      let avatarImg = avatar.style.backgroundImage
      if (checkNull(avatarImg)) {
        current.$toast.top('头像不能为空')
        return false
      }
      if (avatarImg !== '') {
        avatarImg = avatarImg.substring(5, avatarImg.length - 2)
      }
      // 背景
      let bg = document.getElementById('bgupload_preview')
      let bgImg = bg.style.backgroundImage
      if (checkNull(bgImg)) {
        current.$toast.top('背景不能为空')
        return false
      }
      if (bgImg !== '') {
        bgImg = bgImg.substring(5, bgImg.length - 2)
      }
      // 只修改头像
      if (bgImg.startsWith('http')) {
        current.doEditAvatar(_userInfo, avatarImg)
      } else {
        current.doEdit(_userInfo, avatarImg, bgImg)
      }
    },
    doEdit: (_userInfo, avatarImg, bgImg) => {
      _lock = true
      current.doLoadingButton()
      Vue.axios({
        method: 'post',
        url: '/api/v1/user/edit',
        headers: {
          'token': _userInfo.token,
          'userId': _userInfo.userId
        },
        data: {
          flag: 4,
          content: bgImg
        }
      }).then(response => {
        _lock = false
        if (response.data.code !== 0) {
          current.doRefreshButton()
          if (response.data.code === 20001) {
            current.$toast.top('请重新登录')
            return false
          }
          current.$toast.top('修改失败')
          return false
        }
        _userInfo.background = response.data.data
        setItem('user', JSON.stringify(_userInfo))
        current.doEditAvatar(_userInfo, avatarImg)
      })
        .catch(error => {
          _lock = false
          current.doRefreshButton()
          current.$toast.top('修改失败')
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    doEditAvatar: (_userInfo, avatarImg) => {
      _lock = true
      Vue.axios({
        method: 'post',
        url: '/api/v1/user/edit',
        headers: {
          'token': _userInfo.token,
          'userId': _userInfo.userId
        },
        data: {
          flag: 0,
          content: avatarImg
        }
      }).then(response => {
        _lock = false
        if (response.data.code !== 0) {
          current.doRefreshButton()
          if (response.data.code === 20001) {
            current.$toast.top('请重新登录')
            return false
          }
          current.$toast.top('修改失败')
          return false
        }
        current.$toast.top('修改成功')
        _userInfo.avatar = response.data.data
        setItem('user', JSON.stringify(_userInfo))
        current.goBack()
      })
        .catch(error => {
          _lock = false
          current.doRefreshButton()
          current.$toast.top('修改失败')
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    //
    preview: function (event) {
      if (!window.FileReader) { // html5方案
        current.$toast.bottom('您的设备暂不支持上传图片')
        return false
      }
      let _file = event.currentTarget
      let photoItemId = _file.getAttribute('id')
      let box = document.getElementById(photoItemId + '_preview')

      let f = _file.files[0]

      let fr = new FileReader()
      fr.onload = e => {
        let size = f.size
        let src = e.target.result
        let isAvatar = (photoItemId === 'avatarupload')
        box.style.backgroundImage = 'url(' + src + ')'
        if (size > 1024 * 200) {
          let mul = (1024 * 200) / size
          var img = new Image()
          img.src = e.target.result
          img.onload = () => {
            if (isAvatar) {
              src = current.compress(img, mul, true)
            } else {
              src = current.compress(img, mul, false)
            }
            box.style.backgroundImage = 'url(' + src + ')'
          }
        }
        if (isAvatar) {
          _file.style.display = 'none'
          box.getElementsByClassName('fa')[0].style.display = 'none'
          box.onclick = e => {
            let target = e.currentTarget
            let bigImgdiv = document.getElementById('bigImgdiv')
            bigImgdiv.setAttribute('item_id', target.id)
            bigImgdiv.classList.remove('fade-out', 'unmark')
            bigImgdiv.classList.add('mark', 'fade-in')
            let bigImg = document.getElementById('bigImg')
            let bg = target.style.backgroundImage
            bigImg.setAttribute('src', bg.substring(5, bg.length - 2))
            bigImg.onclick = e => {
              bigImgdiv.classList.remove('mark', 'fade-in')
              bigImgdiv.classList.add('fade-out', 'unmark')
            }
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

      let photoItemId = document.getElementById('avatarupload_preview')
      let _userInfo = JSON.parse(getItem('user'))
      if (!checkNull(_userInfo)) {
        photoItemId.style.backgroundImage = 'url(' + current.headForImg + _userInfo.avatar + ')'
      }

      let _file = box.getElementsByClassName('file')[0]
      box.getElementsByClassName('fa')[0].style.display = 'block'
      _file.style.display = 'block'
      _file.value = ''
      box.style.display = ''
    },
    //
    doRefreshButton: () => {
      let _target = document.getElementById('publish')
      _target.innerHTML = '确定'
      _target.className = 'header_w'
    },
    //
    doLoadingButton: () => {
      let _target = document.getElementById('publish')
      _target.innerHTML = ''
      _target.className = 'header_w fa fa-spinner fa-spin'
    },
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    //
    onCompleted: function () {
    }
  }
}
