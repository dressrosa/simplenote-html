<template>
  <div class="full_body">
    <div class="common_header">
      <div class="header_arrow" @click="goBack()">
        <dt class>取消</dt>
      </div>
      <div class="center_title">
        <dt>头像</dt>
      </div>
      <div class="header_done">
        <a class="header_w" @click="edit()" id="publish">
          <dt class>确定</dt>
        </a>
      </div>
    </div>
    <div style="margin-top:45px;">
      <div
        id="bgupload_preview"
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
              />
            </g>
          </svg>
          <input
            id="bgupload"
            type="file"
            class="file"
            name="bg"
            single
            accept="image/jpeg, image/jpg, image/png"
            @change="preview($event)"
            style="position: absolute; width: 50px; left: 0px; top: 0px; right: 0px; opacity: 0;"
          />
        </button>

        <div class="panel-body">
          <div class="avatar_wrapper">
            <!-- <img alt class="avatar" :src="headForImg+item.avatar"> -->
            <div class="mask">
              <!-- <i
                class="icon_camera"
                style="color: #e2e2e2; font-size: 1.5em; position: absolute; text-align: center; top: 40px; left: 40px;"
              ></i>-->
              <div
                class="photo_item"
                id="avatarupload_preview"
                :style="'background-image:url('+headForImg+item.avatar+')'"
              >
                <i class="fa fa-camera"></i>
                <input
                  id="avatarupload"
                  class="file"
                  type="file"
                  single
                  accept="image/jpeg, image/jpg, image/png"
                  @change="preview($event)"
                  style="opacity:0; width:100px;position: absolute;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info_left">
        这里放一些模版的头像
        <!-- <div v-if="ar.files != null" class="note_floor_wrapper">
            <div class="note_floor">
              <div
                class="note_photo_wrapper"
                v-for="(ph,index) in ar.files"
                :key="ph.id"
                :name="index"
                track-by="$index"
              >
                <img class="note_photo" img-type="avatar" :src="headForImg+ph.url">
              </div>
            </div>
        </div>-->
      </div>
    </div>

    <div id="bigImgdiv" class="unmark" style="background-color:black;">
      <div class="common_header">
        <!-- <div class="header_arrow">
          <i class="fa fa-angle-left"></i>
        </div>-->
        <div class="header_done">
          <a class="header_w" @click="removeFile()">
            <i class="fa fa-trash-o"></i>
          </a>
        </div>
      </div>
      <img id="bigImg" class="bigImg" src />
    </div>
  </div>
</template>
<script src="@/assets/js/simple/modules/user/edit_avatar.js"></script>
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

.photo_item {
  background: #f3f3f3;
  background-size: cover;
  margin: 1px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: -webkit-flex;
  font-size: 20px;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  font-weight: lighter;
  color: gray;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in 1 forwards;
}
.fade-out {
  opacity: 1;
  animation: fadeIn 0.5s ease-in 0 forwards;
}

.mark {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -ms-user-drag: none;
  -user-drag: none;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}
.unmark {
  display: none;
}
.bigImg {
  width: auto;
  height: auto;
  max-width: 80%;
  max-height: 80%;
  /* height: 50%;
  width: 50%; */
  border: 0;
  top: 20%;
  position: relative;
  margin: 0 auto;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: -webkit-flex;
}
</style>
