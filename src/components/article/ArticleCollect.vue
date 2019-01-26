<template>
  <div>
    <common_header_view/>
    <div class="list-group">
      <div
        class="collect_list_item"
        v-for="(ar,index) in items"
        :key="ar.articleId"
        :name="index"
        track-by="index"
        :id="ar.articleId"
      >
        <div class="collect_ar_info">
          <dt>来自:</dt>
          <dt :article-id="ar.user.userId" class="collect_ar_author" v-html="ar.user.nickname"></dt>
          <dt v-if="isLogin" :article-id="ar.articleId" class="collect_ar_unlove">取消收藏</dt>
        </div>
        <div style="text-align: center;">
          <label
            class="collect_ar_title"
            @click="itemClick($event)"
            :article-id="ar.articleId"
            v-html="ar.title"
          ></label>
          <div style="color: #9e9e9e;">
            <label id="collect_ar_like" v-html="ar.attr.likeNum+'个赞'"></label>
            <label id="collect_ar_com" v-html="ar.attr.commentNum+'个评论&nbsp;'"></label>
            <label id="collect_ar_col" v-html="ar.attr.collectNum+'个收藏'"></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="@/assets/js/simple/modules/article/article_collect.js"></script>
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
</style>
