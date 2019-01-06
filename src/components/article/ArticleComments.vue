<template>
  <div class="main" style="margin-top: 45px;">
    <div class="co_comment">
      <div class="co_num">
        <span>全部评论</span>
        <span id="co_comment_num">({{count}})</span>
      </div>
      <div class="co_list">
        <div v-if="items != null" v-for="item in items" :key="item.commentId">
          <div class="left_comment" v-if="item.authorId != item.replyerId">
            <div class="photo">
              <img class="circle" :src="headForImg + item.replyerAvatar">
            </div>
            <div class="item">
              <div class="msg">
                <span v-html="item.content"></span>
              </div>
              <div class="left_triangle"></div>
            </div>
            <div style="clear: both"></div>
          </div>
          <div class="right_comment" v-else>
            <div class="photo" style="float: right;">
              <img class="circle" :src="headForImg+item.replyerAvatar">
            </div>
            <div class="item" style="float: right;">
              <div class="msg">
                <span v-html="item.content"></span>
              </div>
              <div class="right_triangle"></div>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="part_comment" id="part_comment">
        <textarea class="co_tt" placeholder="说说你的见解呗" rows="1" maxlength="50" name="co_tt"></textarea>
        <input class="co_btn" type="button" value="评论" @click="doComment()">
      </div>
      <div
        class="loading"
        style="visibility: hidden; font-size: 13px; text-align: center; color: rgb(144, 145, 144);"
      >
        <label>加载中</label>
        <img
          height="15px"
          withHead="0"
          style="top: 3px; position: relative;"
          width="15px"
          src="../../assets/img/loading.gif"
        >
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/simple/modules/article/article_comments.js"></script>
<style scoped>
@import "../../assets/js/icon/style.css";
.left_comment {
  display: flex;
  padding: 10px;
}

.right_comment {
  padding: 10px;
}

.msg {
  border-radius: 5px;
  padding: 4px;
  position: relative;
  padding: 8px;
}

.item {
  margin: 10px;
  border-radius: 5px;
  display: -webkit-inline-box;
  background: #f9f3f3;
}

.left_triangle {
  height: 0px;
  width: 0px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #f9f3f3 transparent transparent;
  position: relative;
  left: -16px;
  top: 11px;
}

.right_triangle {
  height: 0px;
  width: 0px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #f9f3f3;
  position: relative;
  right: -16px;
  top: 11px;
}

.circle {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>
