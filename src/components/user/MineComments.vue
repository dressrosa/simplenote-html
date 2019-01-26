<template>
  <div>
    <common_header_view/>
    <div class="co" v-for="(c,index) in items" :key="c.commentId" :name="index" track-by="$index">
      <mt-cell-swipe
        :right="[
        {
          content: '回复',
          style: { background: '#487eb3',width:'70px',color: '#ffffff' }
        }, {
          content: '删除',
          style: { background: '#CF4647 ', color: '#ffffff' },
          handler: function(){doConfirmCallback(c.commentId)}
        }
      ]"
        :id="c.commentId"
      >
        <div class="mine_comment">
          <div>
            <img
              class="co_avatar"
              img-type="avatar"
              :src="headForImg+user.avatar"
              :user-id="user.userId"
            >
          </div>
          <div class="mine_co_right">
            <div class="co_article">
              <div>
                <label v-html="c.articleTitle"></label>
              </div>
              <time class="co_time" v-html="c.createDate"></time>
            </div>
            <div class="co_content">
              <p v-html="user.nickname+':'+c.content"></p>
            </div>
          </div>
        </div>
      </mt-cell-swipe>
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
</template>
<script src="@/assets/js/simple/modules/user/mine_comments.js"></script>
<style scoped>
@import "../../assets/css/simple_mobile.css";
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
.co {
  border: 0px;
  margin-left: 5px;
  /* box-shadow: 0 1px 2px rgba(0, 37, 55, 0.05); */
}
.co_avatar {
  height: 50px;
  width: 50px;
  border-radius: 4px;
}
.mine_comment {
  margin: 5px;
  width: 100%;
  display: flex;
  padding: 5px;
  position: relative;
  padding-bottom: 0px;
}
.co_info {
  margin-left: 5px;
  position: relative;
  width: 100%;
  font-size: 15px;
}
.co_nickname_out {
  top: 0px;
  position: relative;
  margin: 0px;
  padding: 0px;
}
.co_nickname_in {
  font-size: 12px;
  top: 0px;
  position: relative;
  margin: 0px;
}
.mine_co_right {
  width: 100%;
  margin-left: 10px;
}
.co_content {
  position: absolute;
  left: 19px;
  bottom: 1px;
  width: 100%;
  font-size: 17px;
  -webkit-transform: scale(0.75);
  -o-transform: scale(1);
}
.co_time {
  font-size: 14px;
  color: #6d6d6d;
  float: right;
  position: absolute;
  right: 0;
  -webkit-transform: scale(0.75);
  -o-transform: scale(1);
}
.co_article {
  width: 100%;
  font-size: 15px;
  color: #222222;
  display: flex;
  word-break: keep-all;
}
.co_quote {
  font-size: 14px;
}
</style>
