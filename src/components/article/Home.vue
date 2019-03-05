<template>
  <div>
    <div>
      <div class="common_header"></div>
    </div>
    <div class="top">
      <div class="top_n1">
        <div
          class="top_n1_banner"
          style="opacity: 1; background-image: url(http://xiaoyu1-1253813687.costj.myqcloud.com/common/pic_home_bg.jpg);"
        ></div>
        <div class="top_n1_info" id="top_n1_info">
          <label>见字如面,不慵不扰</label>
          <div class="search_module">
            <div style="width:100%;">
              <input class="search_module_input" placeholder="搜索文章">
            </div>
            <div class="search_icon">
              <i class="fa fa-search search" href="/home"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-if="items != null">
      <div class="list_hot">
        <div class="item_list" id="simpleHome">
          <dl v-for="(ar,index) in items" :key="ar.id" :name="index" track-by="$index">
            <div class="list_item">
              <div class="item_userinfo">
                <div class="item_useravatar">
                  <img
                    class="avatar small"
                    img-type="avatar"
                    :src="headForImg+ar.user.avatar"
                    :id="ar.user.userId"
                    @click="avatarClick($event)"
                  >
                </div>
                <div class="item_desc">
                  <dt class="item_username" v-html="ar.user.nickname"></dt>
                  <p class="item_usersign" v-html="ar.user.signature"></p>
                </div>
              </div>
              <div class="item_ar" :id="ar.articleId" @click="itemClick($event)">
                <dt class="item_ar_title" v-html="ar.title"></dt>
                <p class="item_ar_content" v-html="ar.brief+'...'"></p>
              </div>
              <div class="comment_bar">
                <div class="bar_part">
                  <i
                    v-if="ar.isLike =='1'"
                    class="fa fa-thumbs-up"
                    style="color:#ED6D54;"
                    data-like="1"
                    @click="likeClick($event)"
                    :article-id="ar.articleId"
                  ></i>
                  <i
                    v-else
                    class="fa fa-thumbs-o-up"
                    data-like="0"
                    @click="likeClick($event)"
                    :article-id="ar.articleId"
                  ></i>
                  <label style="margin: 2px;" v-html="ar.attr.likeNum"></label>
                </div>
                <div class="bar_part">
                  <i
                    class="fa fa-comment-o"
                    @click="commentClick($event)"
                    :article-id="ar.articleId"
                  ></i>
                  <label style="margin: 2px;" v-html="ar.attr.commentNum"></label>
                </div>
                <div class="bar_part">
                  <i
                    v-if="ar.isCollect == '1'"
                    class="fa fa-heart"
                    @click="heartClick($event)"
                    style="color:#ED6D54;"
                    data-heart="1"
                    :article-id="ar.articleId"
                  ></i>
                  <i
                    v-else
                    class="fa fa-heart-o"
                    @click="heartClick"
                    data-heart="0"
                    :article-id="ar.articleId"
                  ></i>
                  <label style="margin: 2px;" v-html="ar.attr.collectNum"></label>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <!-- <div class="login_tip" v-if="!isLogin">
        <a class="login_a" href="/login" id="login">登录/注册</a>
      </div>-->
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
      <div class="panel_card_wrapper_smaller" style="display: none">
        <div class="panel_card">
          <div class="card_up">
            <div class="card_mask"></div>
            <div class="card_u">
              <label></label>
              <label></label>
            </div>
          </div>
          <div class="card_down">
            <div class="card_down_l">
              <label>文章</label>
              <label id="ar_number">0</label>
            </div>
            <div class="card_down_l">
              <label>读者</label>
              <label id="fo_number">0</label>
            </div>
            <div class="card_down_r"></div>
          </div>
        </div>
      </div>
    </div>
    <common_footer_view/>
  </div>
</template>
<script src="@/assets/js/simple/modules/article/article_home.js"></script>

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
  -ms-flex-align: center;
  align-items: center;
}
</style>
