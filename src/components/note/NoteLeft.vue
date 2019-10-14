<template>
  <div class="full_body">
    <div class="common_header">
      <div class="header_arrow" @click="goBack()">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="header_done">
        <a class="header_w" @click="leftNote()" id="publish">
          <i class="fa fa-paper-plane"></i>
        </a>
      </div>
    </div>
    <div class="box" style="margin-top:45px;">
      <div>
        <textarea class="left_editor" id="noteContent" rows="5" maxlength="100" placeholder></textarea>
      </div>
      <div class="photo_editor">
        <div class="photo_item" id="item1">
          <i class="fa fa-plus"></i>
          <input
            id="file1"
            class="file1"
            parent_id="item1"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            @change="preview($event)"
            style="opacity:0; width:100px;position: absolute;"
          >
        </div>
        <div class="photo_item" id="item2" style="display:none">
          <i class="fa fa-plus"></i>
          <input
            id="file2"
            class="file2"
            parent_id="item2"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            @change="preview($event)"
            style="opacity:0; width:100px;position: absolute;"
          >
        </div>
        <div class="photo_item" id="item3" style="display:none">
          <i class="fa fa-plus"></i>
          <input
            id="file3"
            class="file3"
            parent_id="item3"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            @change="preview($event)"
            style="opacity:0; width:100px;position: absolute;"
          >
        </div>
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
      <img id="bigImg" class="bigImg" src>
    </div>
  </div>
</template>
<script src="@/assets/js/simple/modules/note/note_left.js"></script>
<style scoped>
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

.header_done {
  position: absolute;
  right: 5px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: -webkit-flex;
}
.full_body {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  font-size: 15px;
  overflow: hidden;
}
.edit_title {
  width: 100%;
  text-align: center;
  align-content: center;
  align-items: center;
  margin: 0 auto;
}
.left_editor {
  caret-color: #34a539;
  height: 80%;
  width: 99%;
  color: #2a363b;
  margin: 5px;
  margin-bottom: 0px;
  font-size: 15px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
  -webkit-appearance: none;
  outline: none;
  border: 0px;
}
.photo_editor {
  display: flex;
  text-align: center;
  height: 100px;
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
