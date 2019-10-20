<template>
  <div class="full_body">
    <div class="common_header">
      <div class="header_arrow" @click="goBack()">
        <i class="fa fa-angle-left"></i>
      </div>
    </div>
    <div class="login_main">
      <label>长点心吧小鬼,这是你该来的地方吗</label>
    </div>
  </div>
</template>
<script src="@/assets/js/simple/modules/other/404.js"></script>
<style scoped>
button {
  cursor: pointer;
  -webkit-appearance: none;
}
.full_body {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 17px;
  line-height: 30px;
  overflow: hidden;
  background-size: cover;
  background-attachment: fixed;
  position: fixed;
}
.common_header {
  position: fixed;
  display: flex;
  top: 0px;
  left: 0px;
  height: 45px;
  width: 100%;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.5);
  z-index: 99;
  white-space: nowrap;
  margin-bottom: 1px;
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
  color: #8f8f8f;
}
.login_main {
  position: fixed;
  bottom: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
  background-color: rgba(255, 255, 255, 0.51);
}
</style>
