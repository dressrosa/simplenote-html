<template>
  <div class="full_body">
    <div class="common_header">
      <div class="header_arrow" @click="goBack()">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="header_done">
        <a class="header_w" @click="publish()" id="publish">完成</a>
      </div>
    </div>
    <div class="markdown-editor-box" style="margin-top:45px;">
      <div class="edit_title">
        <textarea
          cols="1"
          row="1"
          maxlength="15"
          class="edit_title_input"
          placeholder="请输入标题"
          :value="articleTitle"
        ></textarea>
      </div>
      <div id="markdown-editor">
        <mavon-editor ref="mymd" :model="markdown_content" />
      </div>
    </div>
  </div>
</template>
<script src="@/assets/js/simple/modules/article/article_write.js"></script>

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
  display: initial;
}
.full_body {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  font-size: 15px;
  overflow: scroll;
}
.edit_title {
  width: 100%;
  text-align: center;
  align-content: center;
  align-items: center;
  margin: 0 auto;
}
.edit_title_input {
  width: 99%;
  color: #2a363b;
  margin-top: 5px;
  margin-bottom: 0px;
  text-align: center;
  font-size: 20px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
  -webkit-appearance: none;
  outline: none;
  border: 0px;
}
.markdown-editor-box {
  height: 100%;
  width: 100%;
}
.markdown-editor {
  height: 100%;
  min-height: 400px;
  width: 100%;
}
</style>
