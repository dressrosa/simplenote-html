<template>
  <div>
    <div class="login_main">
      <div class="login_panel">
        <form id="xyForm" role="form" action="#" method="post" class="panel_form loginform">
          <input
            class="login_input"
            type="text"
            placeholder="邮箱/手机号"
            required="required"
            name="loginName"
            id="loginName"
            maxlength="20"
          >
          <div class="eye_input">
            <input
              class="login_input pwd"
              type="password"
              placeholder="密码"
              required="required"
              name="password"
              id="password"
              maxlength="20"
            >
            <label class="addon icon-eye" @click="showPwd($event)"></label>
          </div>
          <ul class="list-group">
            <input type="button" value="登录" class="xbtn logining">
            <div class="change_a">
              <a class="change goregister">注册</a>
            </div>
            <span class="tooltip"></span>
          </ul>
        </form>
        <form
          id="xyForm1"
          role="form"
          action="#"
          method="post"
          class="panel_form registerform"
          style="display: none;"
        >
          <input
            class="login_input"
            type="text"
            placeholder="邮箱/手机号"
            required="required"
            name="loginName"
            id="loginName1"
            maxlength="20"
          >
          <div class="eye_input">
            <input
              class="login_input pwd"
              type="password"
              placeholder="密码"
              required="required"
              name="password"
              id="password1"
              maxlength="20"
            >
            <label class="addon icon-eye" @click="showPwd($event)"></label>
          </div>
          <input
            class="login_input"
            type="password"
            placeholder="确认密码"
            required="required"
            name="repassword"
            id="repassword"
            maxlength="20"
          >
          <ul class="list-group">
            <input type="button" value="注册" class="xbtn registering">
            <div class="change_a">
              <a class="change gologin">登录</a>
            </div>

            <span class="tooltip"></span>
          </ul>
        </form>
      </div>
    </div>
    <div class="footer">
      <!--  <div class="hr1-line" style="margin-bottom: 10px"></div> -->
      <div class="copyright" style="float: left; margin-right: 3px;">
        <font style="margin-right: 3px;">©2016-2018</font>
        <a href="html/xiaoyu.me.html">xiaoyu.me</a>
      </div>
    </div>
  </div>
</template>

 <!-- <script src="@/assets/js/simple/modules/common/login.js"></script> -->
<style >
@import "../../assets/css/simple_mobile.css";
body {
  font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 15px;
  line-height: 25px;
  overflow: hidden;
  background-image: url("../../assets/img/book_allname.png");
  background-size: cover;
  background-attachment: fixed;
  position: fixed;
}

input[type="button"],
input[type="submit"],
input[type="file"],
button {
  cursor: pointer;
  -webkit-appearance: none;
}

.login_main {
  position: fixed;
  bottom: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
}

.login_input {
  margin: 3px;
  padding: 5px;
  border: 0px;
  height: 35px;
  width: 304px;
  max-width: 420px;
  background: rgba(255, 255, 255, 0);
  border: 0px;
  border-bottom: 1px solid #cac8c8;
}

.eye_input {
  position: relative;
}

.login_panel {
  display: -webkit-box;
  text-align: -webkit-center;
}

.addon {
  margin-bottom: 3px;
  margin-top: 3px;
  padding: 14px;
  color: #c1b6b6;
  position: absolute;
  right: 0px;
  top: 0px;
}

.xbtn {
  margin: 7px;
  width: 304px;
  max-width: 430px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 4px;
  background: #cf4647;
  height: 47px;
  border: 1px solid transparent;
  font-size: 15px;
  color: #ffffff;
}

.panel_form {
  margin: 0 auto;
  border-radius: 4px;
}

.change {
  position: absolute;
  left: 4px;
  margin: 3px;
  color: #000000;
  cursor: pointer;
}

.change_a {
  position: relative;
}
</style>
