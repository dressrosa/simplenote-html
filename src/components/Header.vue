<template>
  <div style="margin-bottom: 45px;">
    <div class="common_header">
      <div class="header_arrow" @click="goBack()">
        <i class="fa fa-angle-left"></i>
      </div>
      <!-- <div class="header_search">
        <input class="input_search" placeholder="搜索文章">
        <i class="fa fa-search search" href="/"></i>
      </div>-->
      <!-- <div v-if="loginInfo != null" id="userSpan" class="header_user">
        <a class="header_w" id="nickname" href="/mine" v-html="loginInfo.nickname"></a>
      </div>
      <div v-else id="loginSpan" class="header_user">
        <a class="header_w" @click="login()" id="login">登录</a>
      </div>-->
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
// import Meta from 'vue-meta'
// Vue.use(Meta)
// export default {
//   metaInfo: {
//     meta: [
//       { name: 'Content-Type', content: 'text/html; charset=UTF-8' },
//       {
//         name: 'viewport',
//         content:
//           'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes'
//       },
//       { name: 'Expires', content: '0' },
//       { name: 'Cache-Control', content: 'no-cache' },
//       { name: 'Cache-Control', content: 'no-store' },
//       { name: 'referrer', content: 'no-referrer' },
//       { name: 'Pragma', content: 'no-cache' },
//       { name: 'author', content: 'xiaoyu' },
//       { name: 'description', content: '唯有读书,不慵不扰' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' }
//     ]
//   }
// }
</script>
<script src="@/assets/js/simple/header.js"></script>
<style>
@import "../assets/css/simple_mobile.css";
</style>
<style scoped>
@import "../assets/css/font-awesome/css/font-awesome.min.css";
.common_header {
  position: fixed;
  display: flex;
  top: 0px;
  left: 0px;
  height: 45px;
  width: 100%;
  background: #cf4647;
  box-shadow: 0px 0px 5px #a7a7a7;
  z-index: 99;
  -webkit-transition: background 0.5s;
  white-space: nowrap;
  -ms-flex-align: center;
  align-items: center;
}
.header_arrow {
  position: absolute;
  left: 5px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  font-size: 2em;
  color: #ffffff;
}
.header_search {
  /* input垂直居中 */
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: none;
}
.header_user {
  position: absolute;
  right: 5px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: initial;
}
</style>
