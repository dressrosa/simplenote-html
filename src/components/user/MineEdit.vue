<template>
  <div class="full_body">
    <common_header_view/>
    <div class>
      <div
        class="panel panel-default"
        :style="'background: url('+headForImg+item.background+') repeat 0% 0%/cover;'"
      >
        <button class="camera" type="button" style="cursor: pointer">
          <svg
            viewBox="0 0 20 16"
            class="Icon Icon--camera Icon--left"
            width="14"
            height="16"
            aria-hidden="true"
            style="height: 16px; width: 34px;"
          >
            <g>
              <path
                d="M18.094 2H15s-1-2-2-2H7C6 0 5 2 5 2H2C0 2 0 3.967 0 3.967V14c0 2 2.036 2 2.036 2H17c3 0 3-1.983 3-1.983V4c0-2-1.906-2-1.906-2zM10 12c-1.933 0-3.5-1.567-3.5-3.5S8.067 5 10 5s3.5 1.567 3.5 3.5S11.933 12 10 12zm0 1.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7.5-8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
          <input
            id="bgupload"
            type="file"
            name="bg"
            single
            style="position: absolute; width: 50px; left: 0px; top: 0px; right: 0px; opacity: 0;"
          >
        </button>

        <div class="panel-body">
          <div class="avatar_wrapper">
            <img alt class="avatar" :src="headForImg+item.avatar">
            <div class="mask" style="display: none;">
              <i
                class="icon_camera"
                style="color: #e2e2e2; font-size: 1.5em; position: absolute; text-align: center; top: 40px; left: 40px;"
              ></i>
            </div>
          </div>
        </div>

        <div class="panel-body nickname_panel"></div>
        <div class="panel-body des_panel"></div>
      </div>
      <div class="info">
        <div class="info_left">
          <form class="panel-item" id="item_name">
            <div class="panel_title">
              <label>昵称:</label>
            </div>
            <div class="panel_info">
              <input class="info_input" :value="item.nickname" maxlength="8">
            </div>
            <div class="operate_div">
              <input class="sub_btn" type="button" value="保存">
              <input class="sub_btn_cancel" type="button" value="取消">
            </div>
          </form>
          <form class="panel-item" id="item_sign">
            <div class="panel_title">
              <label>签名:</label>
            </div>
            <div class="panel_info">
              <input class="info_input sign_input" :value="item.signature">
            </div>
            <div class="operate_div">
              <input class="sub_btn" type="button" value="保存">
              <input class="sub_btn_cancel" type="button" value="取消">
            </div>
          </form>
          <form class="panel-item" id="item_desc">
            <div class="panel_title">
              <label>简介:</label>
            </div>
            <div class="panel_info">
              <textarea
                class="info_input longer"
                style="resize: none; width: 100%;"
                rows="4"
                v-html="item.description"
              ></textarea>
            </div>
            <div class="operate_div">
              <input class="sub_btn" type="button" value="保存">
              <input class="sub_btn_cancel" type="button" value="取消">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="@/assets/js/simple/modules/user/mine_edit.js"></script>
<style scoped>
@import "../../assets/css/simple_mobile.css";
@import "../../assets/css/font-awesome/css/font-awesome.min.css";
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
</style>
