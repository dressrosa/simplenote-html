<template>
  <div class="full_body">
    <common_header_view/>
    <div class="mine_header" v-if="items != null" @click="goEdit()">
      <div>
        <img class="mine_avatar" :src="headForImg+items.avatar">
      </div>
      <div class="mine_info">
        <div class="mine_name">
          <label v-html="items.nickname"></label>
        </div>
        <div class="mine_sign">
          <label v-html="items.signature"></label>
        </div>
      </div>
    </div>
    <div class="mine_header" v-else>
      <div class="mine_unlogin" @click="goLogin()">
        <label>这里有点不一样</label>
      </div>
    </div>
    <div style="margin-top:5px; height: 100%;">
      <div class="mine_out_module" @click="goArticles()">
        <div>
          <i class="fa fa-leaf" style="color:#34a539;"></i>
        </div>
        <div class="mine_label">
          <label>札记</label>
        </div>
        <div class="mine_arrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="mine_out_module" @click="goCollects()">
        <div>
          <i class="fa fa-heart-o" style="color:#CF4647;"></i>
        </div>
        <div class="mine_label">
          <label>收藏</label>
        </div>
        <div class="mine_arrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="mine_in_module" @click="goFollowing()">
        <div>
          <i class="fa fa-globe" style="color:#487eb3;"></i>
        </div>
        <div class="mine_label">
          <label>关注</label>
        </div>
        <div class="mine_arrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="mine_in_module">
        <div>
          <i class="fa fa-thumbs-o-up" style="color:#3dabb3;"></i>
        </div>
        <div class="mine_label">
          <label>点赞</label>
        </div>
        <div class="mine_arrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="mine_in_module" @click="goComments()">
        <div>
          <i class="fa fa-comments-o" style="color:#FFB563;"></i>
        </div>
        <div class="mine_label">
          <label>评论</label>
        </div>
        <div class="mine_arrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="mine_out_module">
        <div>
          <i class="fa fa-cog" style="color:#888888;"></i>
        </div>
        <div class="mine_label">
          <label>设置</label>
        </div>
        <div class="mine_arrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="mine_out_module">
        <label></label>
      </div>
    </div>
    <common_footer_view/>
  </div>
</template>
<script src="@/assets/js/simple/modules/user/mine.js"></script>
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
.mine_label {
  margin-left: 10px;
}
.mine_header {
  display: flex;
  padding: 30px;
  background-color: white;
  cursor: auto;
}
.mine_arrow {
  margin: 0 auto;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  float: right;
  position: absolute;
  right: 5px;
  font-size: 2em;
  color: #dddddd;
}
.mine_unlogin {
  text-align: center;
  color: #487eb3;
  margin: 0 auto;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.mine_avatar {
  border-radius: 10%;
  width: 50px;
  height: 50px;
}
.mine_info {
  margin-left: 10px;
  position: relative;
  width: 100%;
}
.mine_name {
  font-size: 18px;
  position: absolute;
  font-weight: bold;
  width: 100%;
  top: 0px;
}
.mine_sign {
  position: absolute;
  color: #ababab;
  width: 100%;
  bottom: 0px;
  white-space: nowrap;
}
.mine_out_module {
  background: white;
  border-top: 1px solid rgba(226, 226, 226, 0.9);
  padding: 15px;
  margin-top: 5px;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.mine_in_module {
  background: white;
  border-top: 0.5px solid rgba(226, 226, 226, 0.9);
  padding: 15px;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
</style>
