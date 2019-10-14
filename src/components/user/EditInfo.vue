<template>
  <div class="full_body">
    <div class="common_header">
      <div class="header_arrow" @click="goBack()">
        <dt class>取消</dt>
      </div>
      <div class="center_title">
        <dt v-if="item == 1">签名</dt>
        <dt v-else-if="item == 2">简介</dt>
        <dt v-else-if="item == 3">昵称</dt>
      </div>
      <div class="header_done">
        <a class="header_w" @click="edit()">
          <dt class>确定</dt>
        </a>
      </div>
    </div>
    <div style="margin-top:45px;">
      <input id="editContent" class="edit-box" value="ion">
    </div>
  </div>
</template>
<script src="@/assets/js/simple/modules/user/edit_info.js"></script>
<style scoped>
.full_body {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  font-size: 15px;
  overflow: hidden;
  background-color: #efefef;
}
.common_header {
  position: fixed;
  display: flex;
  top: 0px;
  left: 0px;
  height: 45px;
  width: 100%;
  color: #ffffff;
  background: #cf4647;
  box-shadow: 0px 0px 5px #a7a7a7;
  z-index: 99;
  -webkit-transition: background 0.5s;
  white-space: nowrap;
  margin-bottom: 1px;
  -ms-flex-align: center;
  align-items: center;
}
.center_title {
  position: relative;
  text-align: center;
  margin: 0 auto;
  -webkit-align-items: center;
  align-items: center;
}
.header_arrow {
  position: absolute;
  left: 5px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  color: #ffffff;
}

.header_done {
  position: absolute;
  right: 5px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: -webkit-flex;
}
.edit-item {
  display: flex;
  white-space: nowrap;
  position: relative;
  padding: 10px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #ffffff;
  border-bottom: 0px;
  box-shadow: 0 3px 1px rgba(97, 91, 91, 0.22);
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 3px 1px rgba(97, 91, 91, 0.22);
}
.edit-item-left {
}
dt {
  max-width: 100%;
  display: inline-block;
}
.edit-item-right {
  position: absolute;
  right: 5px;
}
.edit-box {
  font-size: 14px;
  caret-color: #34a539;
  width: 100%;
  min-height: 50px;
  padding-left: 5px;
}
</style>
