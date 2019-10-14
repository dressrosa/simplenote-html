<template>
  <div>
    <common_header_view/>
    <div class="love_ar_list">
      <dl v-for="(ar,index) in arItems" :key="ar.articleId" :name="index" track-by="$index">
        <div class="love_ar_model">
          <div class="item_userinfo">
            <div class="item_useravatar">
              <img
                class="avatar small"
                img-type="avatar"
                :src="headForImg+ar.user.avatar"
                :user-id="ar.user.userId"
                @click="avatarClick($event)"
              >
            </div>
            <div class="item_desc">
              <dt class="item_username" v-html="ar.user.nickname"></dt>
              <p class="item_usersign" v-html="ar.user.signature"></p>
            </div>
          </div>
          <label style="font-size: 13px;color: #dddddd;">最近发表:</label>
          <div class="font_center">
            <label style="cursor:pointer;width:100%;" v-html="ar.title"></label>
            <time style="font-size: 12px;" v-html="ar.createDate"></time>
          </div>
        </div>
      </dl>
    </div>
    <div class="following_label">
      <label>全部关注</label>
    </div>
    <div
      class="following_u"
      v-for="(u,index) in items"
      :key="u.userId"
      :name="index"
      track-by="$index"
    >
      <div class="item_userinfo" :style="'background:url('+headForImg+u.followerBackground +')'">
        <div class="item_useravatar">
          <img
            class="avatar small"
            img-type="avatar"
            :src="headForImg+u.userAvatar"
            :user-id="u.userId"
            @click="avatarClick($event)"
          >
        </div>
        <div class="item_desc">
          <dt class="item_username" v-html="u.userName"></dt>
          <p class="item_usersign" v-html="u.signature"></p>
        </div>
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
<script src="@/assets/js/simple/modules/user/mine_following.js"></script>
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
.following_label {
  margin-left: 5px;
  border-bottom: 1px solid #dddddd;
  -ms-flex-align: center;
  align-items: center;
}
.following_u {
  padding: 5px;
}
</style>
