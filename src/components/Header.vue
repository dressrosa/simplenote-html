<template>
  <div class="header">
    <div class="container">
      <div style="float: left;">
        <a class="header_w" href="/">首页</a>
      </div>
      <div class="search_span1">
        <input class="input_search" placeholder="搜索文章">
        <i class="icon_search search" href="/"></i>
      </div>
      <div v-if="loginInfo != null" id="userSpan" style="float: right; display: block;">
        <a
          class="header_w"
          style="padding-right: 15px;"
          id="nickname"
          :href="/user/ + loginInfo.userId"
          v-html="loginInfo.nickName"
        ></a>
      </div>
      <div v-if="loginInfo == null" id="loginSpan" style="float: right; display: block;">
        <a class="header_w" href="/login" id="login">登录</a>
        <!-- onclick="javascript:gotoLogin('/')" -->
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
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
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
@import "../assets/css/simple_mobile.css";
</style>
