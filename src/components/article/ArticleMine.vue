<template>
  <div class>
    <div class="common_header">
      <div class="header_arrow" @click="goBack()">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="header_done">
        <a class="header_w" href="/article/write">
          <i class="fa fa-plus"></i>
        </a>
      </div>
    </div>
    <div class="mine_article_items">
      <div
        class="mine_article_item"
        v-for="(ar,index) in items"
        :key="ar.articleId"
        :name="index"
        track-by="$index"
      >
        <div style="display:flex;">
          <label
            class="article_item_title"
            :article-id="ar.articleId"
            @click="itemClick($event)"
            v-html="ar.title"
          ></label>
          <i
            :article-id="ar.articleId"
            @click="goEdit($event)"
            class="fa fa-pencil"
            style="color:#487eb3;"
          ></i>
        </div>
        <p class="item_content" :article-id="ar.articleId" v-html="ar.brief+'...'"></p>
        <!-- <div class="comment_bar">
          <div class="bar_part">
            <i v-if="ar.isLike == 1" class="fa fa-thumbs-up" style="color:#fd4d4d" data-like="1"></i>
            <i v-else class="fa fa-thumbs-o-up" data-like="0"></i>
            <label style="margin: 2px" v-html="ar.attr.likeNum"></label>
          </div>
          <div class="bar_part" :article-id="ar.articleId" @click="goComment($event)">
            <i class="fa fa-comment-o"></i>
            <label style="margin: 2px" v-html="ar.attr.commentNum"></label>
          </div>
          <div class="bar_part">
            <i v-if="ar.isCollect == 1" class="fa fa-heart-o" style="color:#fd4d4d" data-heart="1"></i>
            <i v-else class="fa fa-heart-o" data-heart="1"></i>
            <label style="margin: 2px" v-html="ar.attr.collectNum"></label>
          </div>
        </div>-->
      </div>
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
<script src="@/assets/js/simple/modules/article/article_mine.js"></script>
<style scoped>
@import "../../assets/css/simple_mobile.css";
@import "../../assets/css/font-awesome/css/font-awesome.min.css";
.common_header {
  position: fixed;
  display: flex;
  top: 0px;
  left: 0px;
  height: 45px;
  width: 100%;
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
.article_item_title {
  color: #cd5c5c;
  width: 100%;
  float: left;
}
.item_content {
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 20px;
  line-height: 25px;
  color: #2a363b;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif;
}
.mine_article_items {
  /* overflow: hidden; */
  width: 100%;
  margin-top: 45px;
}
.mine_article_item {
  margin: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #ffffff;
  /* border-top: 1px solid #dddddd; */
  box-shadow: 0 1px 3px rgba(0, 37, 55, 0.05);
}
</style>
